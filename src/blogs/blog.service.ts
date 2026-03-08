import { Inject, Injectable } from '@nestjs/common';
import cuid from 'cuid';
import { FieldValue } from 'firebase-admin/firestore';

import { BlogData, BlogStatus } from '@hashibutogarasu/common';
import { PrismaClient } from '@prisma/client';

import { AbstractRepository } from '../shared/repository/abstract.repository.js';
import { AttachmentService } from '../attachments/attachment.service.js';
import { ErrorCodes } from '../shared/errors/error.codes.js';
import { getPrisma } from '../prisma.js';
import { IFirebaseAdminProvider } from '../shared/firebase/firebase-admin.provider.interface.js';
import { IObjectStorageService } from '../storage/object-storage.interface.js';
import type { IObjectStorage } from '../storage/object-storage.interface.js';
import type { CreateBlogDto } from './dto/create-blog.dto.js';
import type { UpdateBlogDto } from './dto/update-blog.dto.js';
import type { ListBlogsQueryDto } from './dto/list-blogs-query.dto.js';
import { mapAttachments } from '../utils/attachment.util.js';

/**
 * Paginated result wrapper.
 */
export interface PaginatedResult<T> {
	data: T[];
	total: number;
	page: number;
	limit: number;
	totalPages: number;
}

@Injectable()
export class BlogService extends AbstractRepository<BlogData> {
	constructor(
		@Inject(IObjectStorageService) private readonly storage: IObjectStorage,
		firebase: IFirebaseAdminProvider,
		private readonly attachmentService: AttachmentService,
	) {
		super(firebase, 'blogs');
	}

	private readonly prisma: PrismaClient = getPrisma();

	async getAuthors(ids: string[]) {
		const users = await this.prisma.user.findMany({
			where: { id: { in: ids } },
			select: { id: true, name: true, image: true },
		});
		return users;
	}

	private get attachmentsCol() {
		return this.firebase.db.collection('attachments');
	}

	/**
	 * List blogs.
	 * - If mine=true & userId present: return own posts only, then apply status filter.
	 * - Authenticated: own posts (all statuses) + published posts from others, then apply status filter.
	 * - Anonymous: published posts only, then apply status filter.
	 */
	async listBlogs(
		userId?: string,
		query: ListBlogsQueryDto = { page: 1, limit: 10, sort: 'desc' },
	): Promise<PaginatedResult<BlogData>> {
		const { page, limit, sort, status, mine } = query;
		const snapshot = await this.collection.orderBy('createdAt', sort).get();
		const allBlogs = snapshot.docs.map((d) => this.mapDoc(d));

		let filtered: BlogData[] = allBlogs as unknown as BlogData[];
		if (mine && userId) {
			filtered = filtered.filter((blog) => blog.authorId === userId);
		} else {
			filtered = filtered.filter((blog) => {
				if (userId && blog.authorId === userId) return true;
				return blog.status === BlogStatus.PUBLISHED;
			});
		}

		if (status) {
			filtered = filtered.filter((blog) => blog.status === status);
		}

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
					attachments: mapAttachments(attachmentsSnapshot),
				} as BlogData;
			}),
		);

		return { data, total, page, limit, totalPages };
	}

	/**
	 * List only the authenticated user's own blog posts.
	 * Supports optional status filter.
	 * @deprecated Use GET /blogs?mine=true instead.
	 */
	async listMyBlogs(
		userId: string,
		query: ListBlogsQueryDto = { page: 1, limit: 10, sort: 'desc' },
	): Promise<PaginatedResult<BlogData>> {
		const { page, limit, sort, status } = query;
		const snapshot = await this.collection
			.where('authorId', '==', userId)
			.orderBy('createdAt', sort)
			.get();
		let allBlogs: BlogData[] = snapshot.docs.map((d) => this.mapDoc(d)) as unknown as BlogData[];

		if (status) {
			allBlogs = allBlogs.filter((blog) => blog.status === status);
		}

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
					attachments: mapAttachments(attachmentsSnapshot),
				} as BlogData;
			}),
		);

		return { data, total, page, limit, totalPages };
	}

	async createBlog(authorId: string, dto: CreateBlogDto): Promise<BlogData> {
		const id = cuid();
		const now = FieldValue.serverTimestamp();
		const data = {
			authorId,
			title: dto.title,
			tags: dto.tags ?? [],
			status: dto.status ?? BlogStatus.DRAFT,
			createdAt: now,
			updatedAt: now,
		};

		await Promise.all([
			this.collection.doc(id).set(data),
			this.storage.putObject(`blogs/${id}/content`, Buffer.from(dto.content ?? ''), 'text/plain; charset=utf-8'),
		]);
		return this.getBlog(id, authorId);
	}

	async getBlog(id: string, userId?: string): Promise<BlogData> {
		const doc = await this.collection.doc(id).get();
		if (!doc.exists) throw ErrorCodes.BLOG.NOT_FOUND;

		const blog = this.mapDoc(doc) as unknown as BlogData;

		if (blog.status !== BlogStatus.PUBLISHED && blog.authorId !== userId) {
			throw ErrorCodes.BLOG.FORBIDDEN;
		}

		const [contentBuffer, attachmentsSnapshot] = await Promise.all([
			this.storage.getObject(`blogs/${id}/content`),
			this.attachmentsCol.where('blogId', '==', id).get(),
		]);

		blog.content = contentBuffer?.toString('utf-8') ?? '';
		blog.attachments = mapAttachments(attachmentsSnapshot);

		return blog;
	}

	async updateBlog(id: string, authorId: string, dto: UpdateBlogDto): Promise<BlogData> {
		const doc = await this.collection.doc(id).get();
		if (!doc.exists) throw ErrorCodes.BLOG.NOT_FOUND;

		const blog = doc.data();
		if (blog?.['authorId'] !== authorId) throw ErrorCodes.BLOG.FORBIDDEN;
		if (blog?.['status'] === BlogStatus.LOCKED) throw ErrorCodes.BLOG.LOCKED;

		const updateData: Record<string, unknown> = {
			updatedAt: FieldValue.serverTimestamp(),
		};
		if (dto.status !== undefined) updateData['status'] = dto.status;
		if (dto.title !== undefined) updateData['title'] = dto.title;
		if (dto.tags !== undefined) updateData['tags'] = dto.tags;

		const ops: Promise<unknown>[] = [this.collection.doc(id).update(updateData)];
		if (dto.content !== undefined) {
			ops.push(this.storage.putObject(`blogs/${id}/content`, Buffer.from(dto.content), 'text/plain; charset=utf-8'));
		}
		await Promise.all(ops);
		return this.getBlog(id, authorId);
	}

	async deleteBlog(id: string, authorId: string): Promise<void> {
		const doc = await this.collection.doc(id).get();
		if (!doc.exists) throw ErrorCodes.BLOG.NOT_FOUND;

		const blog = doc.data();
		if (blog?.['authorId'] !== authorId) throw ErrorCodes.BLOG.FORBIDDEN;
		if (blog?.['status'] === BlogStatus.LOCKED) throw ErrorCodes.BLOG.LOCKED;

		const attachmentsSnapshot = await this.attachmentsCol.where('blogId', '==', id).get();
		const attachments = attachmentsSnapshot.docs.map((d) => d.data());

		await Promise.all([
			...attachments.map((a) => this.storage.deleteObject(a?.['key'] as string)),
			this.storage.deleteObject(`blogs/${id}/content`),
		]);

		const batch = this.firebase.db.batch();
		batch.delete(this.collection.doc(id));
		attachmentsSnapshot.docs.forEach((d) => batch.delete(d.ref));
		await batch.commit();
	}
}
