import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import { NullObjectStorageService } from '../mocks/null-object-storage.service.js';
import { BlogService } from '../../src/blogs/blog.service.js';
import { AttachmentService, UPLOAD_PRESIGNED_URL_EXPIRES_IN } from '../../src/attachments/attachment.service.js';
import { IFirebaseAdminProvider } from '../../src/shared/firebase/firebase-admin.provider.interface.js';
import { MockFirebaseAdminProvider } from '../mocks/firebase-admin.provider.mock.js';
import { ErrorDefinition } from '../../src/shared/errors/error.codes.js';

/**
 * Service tests for the two-step direct-upload flow:
 *  1. issueAttachmentUploadUrl  — issues a presigned PUT URL, no Firestore write
 *  2. syncAttachmentFromStorage — verifies the object in R2, then writes Firestore
 *
 * Object storage is handled by NullObjectStorageService (in-memory stub).
 * Firestore operations target the local Firestore emulator via MockFirebaseAdminProvider.
 */
describe('BlogService — presigned upload URL and sync', () => {
  let service: BlogService;
  let attachmentService: AttachmentService;
  let storage: NullObjectStorageService;
  let firebaseProvider: IFirebaseAdminProvider;

  const authorId = 'test-author-upload-url';

  beforeEach(async () => {
    storage = new NullObjectStorageService();
    firebaseProvider = new MockFirebaseAdminProvider();
    await firebaseProvider.onModuleInit();
    attachmentService = new AttachmentService(storage, firebaseProvider);
    service = new BlogService(storage, firebaseProvider);
  });

  afterEach(async () => {
    try {
      await fetch(
        `http://127.0.0.1:8080/emulator/v1/projects/${IFirebaseAdminProvider.DUMMY_PROJECT_ID}/databases/(default)/documents`,
        { method: 'DELETE' },
      );
    } catch {
      // Firestore emulator may not be available in all environments.
    }
  });

  describe('issueAttachmentUploadUrl', () => {
    it('returns a presigned upload URL with the expected shape', async () => {
      const blog = await service.createBlog(authorId, {
        title: 'Test Blog',
        content: 'Test blog',
        status: 'published',
      });

      const result = await attachmentService.issueAttachmentUploadUrl(blog.id, authorId, {
        contentType: 'image/png',
      });

      expect(result.uploadUrl).toBeDefined();
      expect(typeof result.uploadUrl).toBe('string');
      expect(result.attachmentId).toBeDefined();
      expect(typeof result.attachmentId).toBe('string');
      expect(result.key).toBe(`blogs/${blog.id}/attachments/${result.attachmentId}`);
      expect(result.expiresIn).toBe(UPLOAD_PRESIGNED_URL_EXPIRES_IN);
    });

    it('the upload URL is usable: uploading through it makes the object visible in storage', async () => {
      const blog = await service.createBlog(authorId, {
        title: 'Test Blog',
        content: 'Upload flow blog',
        status: 'published',
      });

      const { uploadUrl, key } = await attachmentService.issueAttachmentUploadUrl(blog.id, authorId, {
        contentType: 'image/png',
      });

      await storage.simulateUploadViaPresignedUrl(uploadUrl, Buffer.from('fake png data'));

      const meta = await storage.getObjectMetadata(key);
      expect(meta).not.toBeNull();
      expect(meta?.contentType).toBe('image/png');
    });

    it('throws BLOG.NOT_FOUND when the blog does not exist', async () => {
      await expect(
        attachmentService.issueAttachmentUploadUrl('nonexistent-blog', authorId, {
          contentType: 'image/png',
        }),
      ).rejects.toBeInstanceOf(ErrorDefinition);
    });

    it('throws BLOG.LOCKED when the blog status is locked', async () => {
      const blog = await service.createBlog(authorId, {
        title: 'Test Blog',
        content: 'Locked blog',
        status: 'locked',
      });

      await expect(
        attachmentService.issueAttachmentUploadUrl(blog.id, authorId, {
          contentType: 'image/png',
        }),
      ).rejects.toBeInstanceOf(ErrorDefinition);
    });

    it('does not create a Firestore attachment document before the file is uploaded', async () => {
      const blog = await service.createBlog(authorId, {
        title: 'Test Blog',
        content: 'No doc blog',
        status: 'published',
      });

      const result = await attachmentService.issueAttachmentUploadUrl(blog.id, authorId, {
        contentType: 'image/jpeg',
      });

      const attachments = await attachmentService.listAttachments(authorId);
      const ids = attachments.map((a) => a.id);
      expect(ids).not.toContain(result.attachmentId);
    });
  });

  describe('syncAttachmentFromStorage', () => {
    it('syncs to Firestore after uploading via the presigned URL', async () => {
      const blog = await service.createBlog(authorId, {
        title: 'Test Blog',
        content: 'Sync blog',
        status: 'published',
      });

      const { uploadUrl, attachmentId, key } = await attachmentService.issueAttachmentUploadUrl(
        blog.id,
        authorId,
        { contentType: 'image/png' },
      );

      await storage.simulateUploadViaPresignedUrl(uploadUrl, Buffer.from('fake image data'));

      const attachment = await attachmentService.syncAttachmentFromStorage(
        attachmentId,
        blog.id,
        authorId,
        { blogId: blog.id },
      );

      expect(attachment.id).toBe(attachmentId);
      expect(attachment.blogId).toBe(blog.id);
      expect(attachment.key).toBe(key);
      expect(attachment.contentType).toBe('image/png');
      expect(attachment.authorId).toBe(authorId);
      expect(attachment.status).toBe('draft');
    });

    it('respects the optional status field when provided', async () => {
      const blog = await service.createBlog(authorId, {
        title: 'Test Blog',
        content: 'Status sync blog',
        status: 'published',
      });

      const { uploadUrl, attachmentId } = await attachmentService.issueAttachmentUploadUrl(
        blog.id,
        authorId,
        { contentType: 'image/webp' },
      );

      await storage.simulateUploadViaPresignedUrl(uploadUrl, Buffer.from('data'));

      const attachment = await attachmentService.syncAttachmentFromStorage(
        attachmentId,
        blog.id,
        authorId,
        { blogId: blog.id, status: 'published' },
      );

      expect(attachment.status).toBe('published');
    });

    it('throws BLOG.ATTACHMENT_NOT_FOUND when the file was never uploaded via the presigned URL', async () => {
      const blog = await service.createBlog(authorId, {
        title: 'Test Blog',
        content: 'Missing upload blog',
        status: 'published',
      });

      const { attachmentId } = await attachmentService.issueAttachmentUploadUrl(blog.id, authorId, {
        contentType: 'image/png',
      });

      await expect(
        attachmentService.syncAttachmentFromStorage(attachmentId, blog.id, authorId, {
          blogId: blog.id,
        }),
      ).rejects.toBeInstanceOf(ErrorDefinition);
    });

    it('throws BLOG.NOT_FOUND when the blog does not exist', async () => {
      await expect(
        attachmentService.syncAttachmentFromStorage('any-id', 'nonexistent-blog', authorId, {
          blogId: 'nonexistent-blog',
        }),
      ).rejects.toBeInstanceOf(ErrorDefinition);
    });

    it('throws BLOG.LOCKED when the blog status is locked', async () => {
      const blog = await service.createBlog(authorId, {
        title: 'Test Blog',
        content: 'Locked for sync',
        status: 'locked',
      });

      await expect(
        attachmentService.syncAttachmentFromStorage('any-id', blog.id, authorId, {
          blogId: blog.id,
        }),
      ).rejects.toBeInstanceOf(ErrorDefinition);
    });
  });
});
