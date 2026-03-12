import { Inject, Injectable } from '@nestjs/common';
import cuid from 'cuid';
import { FieldValue } from 'firebase-admin/firestore';

import { BlogData, BlogStatus } from '@hashibutogarasu/common';
import { PrismaClient } from '@prisma/client';

import { AbstractRepository } from '../shared/repository/abstract.repository.js';
import { ErrorCodes } from '../shared/errors/error.codes.js';
import { Deletable } from '../shared/deletable/deletable.decorator.js';
import type { IDeletable } from '../shared/deletable/deletable.interface.js';
import { getPrisma } from '../prisma.js';
import { IFirebaseAdminProvider } from '../shared/firebase/firebase-admin.provider.interface.js';
import { IObjectStorageService } from '../storage/object-storage.interface.js';
import type { IObjectStorage } from '../storage/object-storage.interface.js';
import type { CreateBlogDto } from './dto/create-blog.dto.js';
import type { UpdateBlogDto } from './dto/update-blog.dto.js';
import type { ListBlogsQueryDto } from './dto/list-blogs-query.dto.js';
import { mapAttachments } from '../utils/attachment.util.js';
import type { PaginatedResult } from '../shared/types/pagination.types.js';

@Deletable(4)
@Injectable()
export class BlogService extends AbstractRepository<BlogData> implements IDeletable {
	constructor(
		@Inject(IObjectStorageService) private readonly storage: IObjectStorage,
		firebase: IFirebaseAdminProvider,
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
		const { limit, sort, status, mine, cursor } = query;

		if (mine && userId) {
			let q = this.collection
				.where('authorId', '==', userId)
				.orderBy('createdAt', sort);
			if (status) {
				q = q.where('status', '==', status);
			}
			const { data: rawBlogs, nextCursor, hasMore } = await this.paginate(q, { limit, cursor });
			const data = await this._enrichBlogs(rawBlogs);
			return { data, total: null, page: null, limit, totalPages: null, nextCursor, hasMore };
		}

		if (!userId) {
			const q = this.collection
				.where('status', '==', BlogStatus.PUBLISHED)
				.orderBy('createdAt', sort);
			if (status && status !== BlogStatus.PUBLISHED) {
				return { data: [], total: 0, page: null, limit, totalPages: 0, nextCursor: null, hasMore: false };
			}
			const { data: rawBlogs, nextCursor, hasMore } = await this.paginate(q, { limit, cursor });
			const data = await this._enrichBlogs(rawBlogs);
			return { data, total: null, page: null, limit, totalPages: null, nextCursor, hasMore };
		}

		const [ownSnap, publishedSnap] = await Promise.all([
			this.collection
				.where('authorId', '==', userId)
				.orderBy('createdAt', sort)
				.limit(limit * 2)
				.get(),
			this.collection
				.where('status', '==', BlogStatus.PUBLISHED)
				.orderBy('createdAt', sort)
				.limit(limit * 2)
				.get(),
		]);

		const seen = new Set<string>();
		let merged: BlogData[] = [];
		for (const doc of [...ownSnap.docs, ...publishedSnap.docs]) {
			if (!seen.has(doc.id)) {
				seen.add(doc.id);
				merged.push(this.mapDoc(doc) as unknown as BlogData);
			}
		}

		merged.sort((a, b) =>
			sort === 'desc'
				? b.createdAt.localeCompare(a.createdAt)
				: a.createdAt.localeCompare(b.createdAt),
		);

		if (status) {
			merged = merged.filter((blog) => blog.status === status);
		}

		if (cursor) {
			const idx = merged.findIndex((b) => b.id === cursor);
			if (idx !== -1) {
				merged = merged.slice(idx + 1);
			}
		}

		const hasMore = merged.length > limit;
		const paged = merged.slice(0, limit);
		const nextCursor = hasMore ? paged[paged.length - 1].id : null;
		const data = await this._enrichBlogs(paged);
		return { data, total: null, page: null, limit, totalPages: null, nextCursor, hasMore };
	}

	/**
	 * List only the authenticated user's own blog posts.
	 * Supports optional status filter and cursor-based pagination.
	 * @deprecated Use GET /blogs?mine=true instead.
	 */
	async listMyBlogs(
		userId: string,
		query: ListBlogsQueryDto = { page: 1, limit: 10, sort: 'desc' },
	): Promise<PaginatedResult<BlogData>> {
		const { limit, sort, status, cursor } = query;
		let q = this.collection
			.where('authorId', '==', userId)
			.orderBy('createdAt', sort);
		if (status) {
			q = q.where('status', '==', status);
		}
		const { data: rawBlogs, nextCursor, hasMore } = await this.paginate(q, { limit, cursor });
		const data = await this._enrichBlogs(rawBlogs);
		return { data, total: null, page: null, limit, totalPages: null, nextCursor, hasMore };
	}

	/**
	 * Enrich blog entries with content from object storage and attachment metadata.
	 */
	private async _enrichBlogs(blogs: BlogData[]): Promise<BlogData[]> {
		return Promise.all(
			blogs.map(async (blog) => {
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

	async deleteData(userId: string): Promise<void> {
		const snapshot = await this.collection.where('authorId', '==', userId).get();
		for (const doc of snapshot.docs) {
			await this.storage.deleteObject(`blogs/${doc.id}/content`).catch(() => undefined);
			await doc.ref.delete();
		}
	}
}
