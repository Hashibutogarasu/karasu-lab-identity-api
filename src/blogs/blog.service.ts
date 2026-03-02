import { Inject, Injectable } from '@nestjs/common';
import cuid from 'cuid';
import { FieldValue, DocumentSnapshot } from 'firebase-admin/firestore';

import { FirebaseAdminProvider } from '../shared/firebase/firebase-admin.provider.js';
import { ErrorCodes } from '../shared/errors/error.codes.js';
import { IObjectStorageService } from '../storage/object-storage.interface.js';
import type { IObjectStorage } from '../storage/object-storage.interface.js';
import type { CreateAttachmentDto } from './dto/create-attachment.dto.js';
import type { CreateBlogDto } from './dto/create-blog.dto.js';
import type { ListBlogsQueryDto } from './dto/list-blogs-query.dto.js';
import type { Status } from './dto/status.schema.js';
import type { UpdateAttachmentDto } from './dto/update-attachment.dto.js';
import type { UpdateBlogDto } from './dto/update-blog.dto.js';
import { PrismaClient } from '@prisma/client';
import getPrisma from '../prisma.js';

/** Maximum allowed attachment size: 8 MB (fits a 4K JPEG/PNG/WebP image). */
export const MAX_ATTACHMENT_SIZE = 8 * 1024 * 1024;

export interface PaginatedResult<T> {
	data: T[];
	total: number;
	page: number;
	limit: number;
	totalPages: number;
}

export interface AttachmentFile {
	buffer: Buffer;
	mimetype: string;
	size: number;
}

export interface AttachmentData {
	id: string;
	blogId: string;
	key: string;
	contentType: string;
	size: number;
	status: Status;
	authorId: string;
	createdAt: Date;
	updatedAt: Date;
}

export interface BlogData {
	id: string;
	content: string;
	authorId: string;
	status: Status;
	locked: boolean;
	createdAt: Date;
	updatedAt: Date;
	attachments?: AttachmentData[];
}

@Injectable()
export class BlogService {
	constructor(
		@Inject(IObjectStorageService) private readonly storage: IObjectStorage,
		private readonly firebase: FirebaseAdminProvider
	) {}

	private readonly prisma: PrismaClient = getPrisma();

	async getAuthors(ids: string[]) {
		const users = await this.prisma.user.findMany({
			where: { id: { in: ids } },
			select: { id: true, name: true, image: true },
		});
		return users;
	}

	private get blogsCol() {
		return this.firebase.db.collection('blogs');
	}

	private get attachmentsCol() {
		return this.firebase.db.collection('attachments');
	}

	private mapDoc<T extends { createdAt: Date; updatedAt: Date }>(doc: DocumentSnapshot): T {
		const data = doc.data();
		const toDate = (val: unknown): Date =>
			val != null && typeof (val as { toDate?: unknown }).toDate === 'function'
				? (val as { toDate(): Date }).toDate()
				: (val as Date);
		return {
			...data,
			id: doc.id,
			createdAt: toDate(data?.createdAt),
			updatedAt: toDate(data?.updatedAt),
		} as unknown as T;
	}

	/**
	 * List blogs.
	 * - Authenticated: own posts (all statuses) + published posts from others.
	 * - Anonymous: published posts only.
	 */
	async listBlogs(
		userId?: string,
		query: ListBlogsQueryDto = { page: 1, limit: 10, sort: 'desc' },
	): Promise<PaginatedResult<BlogData>> {
		const { page, limit, sort } = query;
		const snapshot = await this.blogsCol.orderBy('createdAt', sort).get();
		const allBlogs = snapshot.docs.map((d) => this.mapDoc<BlogData>(d));

		const filtered = allBlogs.filter((blog) => {
			if (userId && blog.authorId === userId) return true;
			return blog.status === 'published';
		});

		const total = filtered.length;
		const totalPages = Math.ceil(total / limit);
		const skip = (page - 1) * limit;
		const paged = filtered.slice(skip, skip + limit);

		const data = await Promise.all(
			paged.map(async (blog) => {
				const [contentBuffer, attachmentsSnapshot] = await Promise.all([
					this.storage.getObject(`blogs/${blog.id}/content`),
					this.attachmentsCol.where('blogId', '==', blog.id).get(),
				]);
				return {
					...blog,
					content: contentBuffer?.toString('utf-8') ?? '',
					attachments: attachmentsSnapshot.docs.map((d) => this.mapDoc<AttachmentData>(d)),
				};
			}),
		);

		return { data, total, page, limit, totalPages };
	}

	/**
	 * List only the authenticated user's own blog posts (all statuses).
	 */
	async listMyBlogs(
		userId: string,
		query: ListBlogsQueryDto = { page: 1, limit: 10, sort: 'desc' },
	): Promise<PaginatedResult<BlogData>> {
		const { page, limit, sort } = query;
		const snapshot = await this.blogsCol
			.where('authorId', '==', userId)
			.orderBy('createdAt', sort)
			.get();
		const allBlogs = snapshot.docs.map((d) => this.mapDoc<BlogData>(d));

		const total = allBlogs.length;
		const totalPages = Math.ceil(total / limit);
		const skip = (page - 1) * limit;
		const paged = allBlogs.slice(skip, skip + limit);

		const data = await Promise.all(
			paged.map(async (blog) => {
				const [contentBuffer, attachmentsSnapshot] = await Promise.all([
					this.storage.getObject(`blogs/${blog.id}/content`),
					this.attachmentsCol.where('blogId', '==', blog.id).get(),
				]);
				return {
					...blog,
					content: contentBuffer?.toString('utf-8') ?? '',
					attachments: attachmentsSnapshot.docs.map((d) => this.mapDoc<AttachmentData>(d)),
				};
			}),
		);

		return { data, total, page, limit, totalPages };
	}

	/**
	 * List attachments.
	 */
	async listAttachments(userId?: string): Promise<AttachmentData[]> {
		const snapshot = await this.attachmentsCol.orderBy('createdAt', 'desc').get();
		const allAttachments = snapshot.docs.map((d) => this.mapDoc<AttachmentData>(d));

		return allAttachments.filter((attachment) => {
			if (userId && attachment.authorId === userId) return true;
			return attachment.status === 'published';
		});
	}

	async createBlog(authorId: string, dto: CreateBlogDto): Promise<BlogData> {
		const id = cuid();
		const now = FieldValue.serverTimestamp();
		const data = {
			authorId,
			status: dto.status ?? 'draft',
			locked: dto.locked ?? false,
			createdAt: now,
			updatedAt: now,
		};

		await Promise.all([
			this.blogsCol.doc(id).set(data),
			this.storage.putObject(`blogs/${id}/content`, Buffer.from(dto.content), 'text/plain; charset=utf-8'),
		]);
		return this.getBlog(id, authorId);
	}

	async getBlog(id: string, userId?: string): Promise<BlogData> {
		const doc = await this.blogsCol.doc(id).get();
		if (!doc.exists) throw ErrorCodes.BLOG.NOT_FOUND;

		const blog = this.mapDoc<BlogData>(doc);
		const PUBLISHED: Status = 'published';

		if (blog.status !== PUBLISHED && blog.authorId !== userId) {
			throw ErrorCodes.BLOG.FORBIDDEN;
		}

		const [contentBuffer, attachmentsSnapshot] = await Promise.all([
			this.storage.getObject(`blogs/${id}/content`),
			this.attachmentsCol.where('blogId', '==', id).get(),
		]);

		blog.content = contentBuffer?.toString('utf-8') ?? '';
		blog.attachments = attachmentsSnapshot.docs.map((d) => this.mapDoc<AttachmentData>(d));

		return blog;
	}

	async updateBlog(id: string, authorId: string, dto: UpdateBlogDto): Promise<BlogData> {
		const doc = await this.blogsCol.doc(id).get();
		if (!doc.exists) throw ErrorCodes.BLOG.NOT_FOUND;

		const blog = doc.data();
		if (blog?.['authorId'] !== authorId) throw ErrorCodes.BLOG.FORBIDDEN;
		if (blog?.['locked']) throw ErrorCodes.BLOG.LOCKED;

		const updateData: Record<string, unknown> = {
			updatedAt: FieldValue.serverTimestamp(),
		};
		if (dto.status !== undefined) updateData['status'] = dto.status;
		if (dto.locked !== undefined) updateData['locked'] = dto.locked;

		const ops: Promise<unknown>[] = [this.blogsCol.doc(id).update(updateData)];
		if (dto.content !== undefined) {
			ops.push(this.storage.putObject(`blogs/${id}/content`, Buffer.from(dto.content), 'text/plain; charset=utf-8'));
		}
		await Promise.all(ops);
		return this.getBlog(id, authorId);
	}

	async deleteBlog(id: string, authorId: string): Promise<void> {
		const doc = await this.blogsCol.doc(id).get();
		if (!doc.exists) throw ErrorCodes.BLOG.NOT_FOUND;

		const blog = doc.data();
		if (blog?.['authorId'] !== authorId) throw ErrorCodes.BLOG.FORBIDDEN;
		if (blog?.['locked']) throw ErrorCodes.BLOG.LOCKED;

		const attachmentsSnapshot = await this.attachmentsCol.where('blogId', '==', id).get();
		const attachments = attachmentsSnapshot.docs.map((d) => d.data());

		await Promise.all([
			...attachments.map((a) => this.storage.deleteObject(a?.['key'] as string)),
			this.storage.deleteObject(`blogs/${id}/content`),
		]);

		const batch = this.firebase.db.batch();
		batch.delete(this.blogsCol.doc(id));
		attachmentsSnapshot.docs.forEach((d) => batch.delete(d.ref));
		await batch.commit();
	}

	async createAttachment(
		blogId: string,
		authorId: string,
		file: AttachmentFile,
		dto: CreateAttachmentDto
	): Promise<AttachmentData> {
		const blogDoc = await this.blogsCol.doc(blogId).get();
		if (!blogDoc.exists) throw ErrorCodes.BLOG.NOT_FOUND;
		if (blogDoc.data()?.['locked']) throw ErrorCodes.BLOG.LOCKED;
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

		await this.attachmentsCol.doc(attachmentId).set(data);
		const doc = await this.attachmentsCol.doc(attachmentId).get();
		return this.mapDoc<AttachmentData>(doc);
	}

	async getAttachment(id: string): Promise<{ url: string; metadata: AttachmentData }> {
		const doc = await this.attachmentsCol.doc(id).get();
		if (!doc.exists) throw ErrorCodes.BLOG.ATTACHMENT_NOT_FOUND;

		const metadata = this.mapDoc<AttachmentData>(doc);
		const url = await this.storage.getPresignedUrl(metadata.key);
		return { url, metadata };
	}

	async updateAttachment(
		id: string,
		authorId: string,
		file: AttachmentFile,
		dto: UpdateAttachmentDto
	): Promise<AttachmentData> {
		const doc = await this.attachmentsCol.doc(id).get();
		if (!doc.exists) throw ErrorCodes.BLOG.ATTACHMENT_NOT_FOUND;

		const metadata = doc.data();
		if (metadata?.['authorId'] !== authorId) throw ErrorCodes.BLOG.FORBIDDEN;

		const blogDoc = await this.blogsCol.doc(metadata?.['blogId'] as string).get();
		if (blogDoc.data()?.['locked']) throw ErrorCodes.BLOG.LOCKED;

		if (file.size > MAX_ATTACHMENT_SIZE) throw ErrorCodes.BLOG.ATTACHMENT_TOO_LARGE;

		await this.storage.putObject(metadata?.['key'] as string, file.buffer, file.mimetype);

		const updateData: Record<string, unknown> = {
			contentType: file.mimetype,
			size: file.size,
			updatedAt: FieldValue.serverTimestamp(),
		};
		if (dto.status !== undefined) updateData['status'] = dto.status;

		await this.attachmentsCol.doc(id).update(updateData);
		const updatedDoc = await this.attachmentsCol.doc(id).get();
		return this.mapDoc<AttachmentData>(updatedDoc);
	}

	async deleteAttachment(id: string, authorId: string): Promise<void> {
		const doc = await this.attachmentsCol.doc(id).get();
		if (!doc.exists) throw ErrorCodes.BLOG.ATTACHMENT_NOT_FOUND;

		const metadata = doc.data();
		if (metadata?.['authorId'] !== authorId) throw ErrorCodes.BLOG.FORBIDDEN;

		const blogDoc = await this.blogsCol.doc(metadata?.['blogId'] as string).get();
		if (blogDoc.data()?.['locked']) throw ErrorCodes.BLOG.LOCKED;

		await this.storage.deleteObject(metadata?.['key'] as string);
		await this.attachmentsCol.doc(id).delete();
	}
}
