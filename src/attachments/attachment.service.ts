import { Inject, Injectable } from '@nestjs/common';
import cuid from 'cuid';
import { FieldValue } from 'firebase-admin/firestore';
import { IFirebaseAdminProvider } from '../shared/firebase/firebase-admin.provider.interface.js';
import { ErrorCodes } from '../shared/errors/error.codes.js';
import { Deletable } from '../shared/deletable/deletable.decorator.js';
import type { IDeletable } from '../shared/deletable/deletable.interface.js';
import { IObjectStorageService, type IObjectStorage } from '../storage/object-storage.interface.js';
import { AbstractRepository } from '../shared/repository/abstract.repository.js';
import type { SyncAttachmentDto } from '../blogs/dto/sync-attachment.dto.js';
import type { CreateAttachmentDto } from '../blogs/dto/create-attachment.dto.js';
import type { UpdateAttachmentDto } from '../blogs/dto/update-attachment.dto.js';
import type { CreateAttachmentUploadUrlDto } from '../blogs/dto/create-attachment-upload-url.dto.js';
import { AttachmentData, BlogStatus } from '@hashibutogarasu/common';

export interface AttachmentFile {
  fieldname: string;
  originalname: string;
  encoding: string;
  mimetype: string;
  size: number;
  buffer: Buffer;
}

/**
 * Maximum attachment size (8 MB).
 */
export const MAX_ATTACHMENT_SIZE = 8 * 1024 * 1024;

/**
 * Presigned upload URL expiration time (15 minutes).
 */
export const UPLOAD_PRESIGNED_URL_EXPIRES_IN = 15 * 60;

/**
 * Result of issuing a presigned upload URL.
 */
export interface AttachmentUploadUrlResult {
  uploadUrl: string;
  attachmentId: string;
  key: string;
  expiresIn: number;
}

@Deletable(2)
@Injectable()
export class AttachmentService extends AbstractRepository<AttachmentData> implements IDeletable {
  constructor(
    @Inject(IObjectStorageService) private readonly storage: IObjectStorage,
    firebase: IFirebaseAdminProvider
  ) {
    super(firebase, 'attachments');
  }

  private get blogsCol() {
    return this.firebase.db.collection('blogs');
  }

  /**
   * List attachments.
   */
  async listAttachments(userId?: string): Promise<AttachmentData[]> {
    const snapshot = await this.collection.orderBy('createdAt', 'desc').get();
    const allAttachments = snapshot.docs.map((d) => this.mapDoc(d));

    return allAttachments.filter((attachment) => {
      if (userId && attachment.authorId === userId) return true;
      return attachment.status === 'published';
    });
  }

  async createAttachment(
    blogId: string,
    authorId: string,
    file: AttachmentFile,
    dto: CreateAttachmentDto
  ): Promise<AttachmentData> {
    const blogDoc = await this.blogsCol.doc(blogId).get();
    if (!blogDoc.exists) throw ErrorCodes.BLOG.NOT_FOUND;
    if (blogDoc.data()?.['status'] === 'locked') throw ErrorCodes.BLOG.LOCKED;
    if (file.size > MAX_ATTACHMENT_SIZE) throw ErrorCodes.BLOG.ATTACHMENT_TOO_LARGE;

    const attachmentId = cuid();
    const key = `blogs/${blogId}/attachments/${attachmentId}`;

    await this.storage.putObject(key, file.buffer, file.mimetype);

    const now = FieldValue.serverTimestamp();
    const data = {
      blogId,
      key,
      contentType: file.mimetype,
      size: file.size,
      status: dto.status ?? 'draft',
      authorId,
      createdAt: now,
      updatedAt: now,
    };

    await this.collection.doc(attachmentId).set(data);
    const doc = await this.collection.doc(attachmentId).get();
    return this.mapDoc(doc);
  }

  async getAttachment(id: string): Promise<{ url: string; metadata: AttachmentData }> {
    const doc = await this.collection.doc(id).get();
    if (!doc.exists) throw ErrorCodes.BLOG.ATTACHMENT_NOT_FOUND;

    const metadata = this.mapDoc(doc);
    const url = await this.storage.getPresignedUrl(metadata.key);
    return { url, metadata };
  }

  async updateAttachment(
    id: string,
    authorId: string,
    file: AttachmentFile,
    dto: UpdateAttachmentDto
  ): Promise<AttachmentData> {
    const doc = await this.collection.doc(id).get();
    if (!doc.exists) throw ErrorCodes.BLOG.ATTACHMENT_NOT_FOUND;

    const metadata = doc.data();
    if (metadata?.['authorId'] !== authorId) throw ErrorCodes.BLOG.FORBIDDEN;

    const blogDoc = await this.blogsCol.doc(metadata?.['blogId'] as string).get();
    if (blogDoc.data()?.['status'] === 'locked') throw ErrorCodes.BLOG.LOCKED;

    if (file.size > MAX_ATTACHMENT_SIZE) throw ErrorCodes.BLOG.ATTACHMENT_TOO_LARGE;

    await this.storage.putObject(metadata?.['key'] as string, file.buffer, file.mimetype);

    const updateData: Record<string, unknown> = {
      contentType: file.mimetype,
      size: file.size,
      updatedAt: FieldValue.serverTimestamp(),
    };
    if (dto.status !== undefined) updateData['status'] = dto.status;

    await this.collection.doc(id).update(updateData);
    const updatedDoc = await this.collection.doc(id).get();
    return this.mapDoc(updatedDoc);
  }

  async deleteAttachment(id: string, authorId: string): Promise<void> {
    const doc = await this.collection.doc(id).get();
    if (!doc.exists) throw ErrorCodes.BLOG.ATTACHMENT_NOT_FOUND;

    const metadata = doc.data();
    if (metadata?.['authorId'] !== authorId) throw ErrorCodes.BLOG.FORBIDDEN;

    const blogDoc = await this.blogsCol.doc(metadata?.['blogId'] as string).get();
    if (blogDoc.data()?.['status'] === 'locked') throw ErrorCodes.BLOG.LOCKED;

    await this.storage.deleteObject(metadata?.['key'] as string);
    await this.collection.doc(id).delete();
  }

  /**
   * Issues a presigned PUT URL that allows the caller to upload an attachment
   * file directly to R2 storage without routing through this server.
   *
   * @param blogId   ID of the blog post the attachment belongs to
   * @param authorId ID of the authenticated user performing the upload
   * @param dto      Request body containing the target content type and optional status
   */
  async issueAttachmentUploadUrl(
    blogId: string,
    authorId: string,
    dto: CreateAttachmentUploadUrlDto,
  ): Promise<AttachmentUploadUrlResult> {
    const blogDoc = await this.blogsCol.doc(blogId).get();
    if (!blogDoc.exists) throw ErrorCodes.BLOG.NOT_FOUND;
    
    const blogData = blogDoc.data();
    if (blogData?.authorId !== authorId) {
      throw ErrorCodes.BLOG.FORBIDDEN;
    }

    if ((blogData?.status as BlogStatus) === 'locked') throw ErrorCodes.BLOG.LOCKED;

    const attachmentId = cuid();
    const key = `blogs/${blogId}/attachments/${attachmentId}`;

    const uploadUrl = await this.storage.getPresignedUploadUrl(
      key,
      dto.contentType,
      UPLOAD_PRESIGNED_URL_EXPIRES_IN,
    );

    return { uploadUrl, attachmentId, key, expiresIn: UPLOAD_PRESIGNED_URL_EXPIRES_IN };
  }

  /**
   * Registers an attachment in Firestore after the file has been uploaded
   * directly to R2 storage via a presigned URL.
   *
   * @param attachmentId ID generated by {@link issueAttachmentUploadUrl}
   * @param blogId       ID of the blog post the attachment belongs to
   * @param authorId     ID of the authenticated user performing the sync
   * @param dto          Request body containing the optional desired status
   */
  async syncAttachmentFromStorage(
    attachmentId: string,
    blogId: string,
    authorId: string,
    dto: SyncAttachmentDto,
  ): Promise<AttachmentData> {
    const blogDoc = await this.blogsCol.doc(blogId).get();
    if (!blogDoc.exists) throw ErrorCodes.BLOG.NOT_FOUND;
    
    const blogData = blogDoc.data();
    if (blogData?.authorId !== authorId) {
      throw ErrorCodes.BLOG.FORBIDDEN;
    }
    
    if (blogData?.['status'] === 'locked') throw ErrorCodes.BLOG.LOCKED;

    const key = `blogs/${blogId}/attachments/${attachmentId}`;
    const objectMeta = await this.storage.getObjectMetadata(key);
    if (!objectMeta) throw ErrorCodes.BLOG.ATTACHMENT_NOT_FOUND;

    const now = FieldValue.serverTimestamp();
    const data = {
      blogId,
      key,
      contentType: objectMeta.contentType,
      size: objectMeta.size,
      status: dto.status ?? 'draft',
      authorId,
      createdAt: now,
      updatedAt: now,
    };

    await this.collection.doc(attachmentId).set(data);
    const doc = await this.collection.doc(attachmentId).get();
    return this.mapDoc(doc);
  }

  async deleteData(userId: string): Promise<void> {
    const snapshot = await this.collection.where('authorId', '==', userId).get();
    for (const doc of snapshot.docs) {
      const metadata = doc.data();
      if (metadata?.['key']) {
        await this.storage.deleteObject(metadata['key'] as string);
      }
      await doc.ref.delete();
    }
  }
}
