/** @format */

import { Inject, Injectable } from '@nestjs/common';
import cuid from 'cuid';
import { FieldValue } from 'firebase-admin/firestore';

import {
	BlogData,
	BlogStatus,
	buildBlogQuery,
	buildAttachmentsQuery,
} from '@hashibutogarasu/common';
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
		firebase: IFirebaseAdminProvider
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
	 * List all published blog posts for the public feed.
	 * Strictly filters by 'published' status.
	 */
	async listPublishedBlogs(
		query: ListBlogsQueryDto = { page: 1, limit: 10, sort: 'desc' }
	): Promise<PaginatedResult<BlogData>> {
		const limit = Number(query.limit) || 10;
		const { sort, status, cursor } = query;

		if (status && status !== BlogStatus.PUBLISHED) {
			return {
				data: [],
				total: 0,
				page: null,
				limit,
				totalPages: 0,
				nextCursor: null,
				hasMore: false,
			};
		}

		const q = buildBlogQuery(this.collection, {
			status: BlogStatus.PUBLISHED,
			sort: sort,
		});

		const { data: rawBlogs, nextCursor, hasMore } = await this.paginate(q, { limit, cursor });
		const data = await this._enrichBlogs(rawBlogs);
		return { data, total: null, page: null, limit, totalPages: null, nextCursor, hasMore };
	}

	/**
	 * List blog posts owned by a specific user (Dashboard view).
	 * Allows filtering by status.
	 */
	async listMyBlogs(
		userId: string,
		query: ListBlogsQueryDto = { page: 1, limit: 10, sort: 'desc' }
	): Promise<PaginatedResult<BlogData>> {
		const limit = Number(query.limit) || 10;
		const { sort, status, cursor } = query;

		const q = buildBlogQuery(this.collection, {
			authorId: userId,
			status: status as BlogStatus | undefined,
			sort: sort,
		});

		const { data: rawBlogs, nextCursor, hasMore } = await this.paginate(q, { limit, cursor });
		const data = await this._enrichBlogs(rawBlogs);
		return { data, total: null, page: null, limit, totalPages: null, nextCursor, hasMore };
	}

	/**
	 * Enrich blog entries with attachment metadata.
	 */
	private async _enrichBlogs(blogs: BlogData[]): Promise<BlogData[]> {
		return Promise.all(
			blogs.map(async (blog) => {
				const attachmentsQuery = buildAttachmentsQuery(this.attachmentsCol, blog.id);
				const attachmentsSnapshot = await attachmentsQuery.get();
				return {
					...blog,
					content: '',
					attachments: mapAttachments(attachmentsSnapshot),
				} as BlogData;
			})
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
			likeCount: 0,
			createdAt: now,
			updatedAt: now,
		};

		await Promise.all([
			this.collection.doc(id).set(data),
			this.storage.putObject(
				`blogs/${id}/content`,
				Buffer.from(dto.content ?? ''),
				'text/plain; charset=utf-8'
			),
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

		const attachmentsSnapshot = await this.attachmentsCol.where('blogId', '==', id).get();

		blog.content = '';
		blog.attachments = mapAttachments(attachmentsSnapshot);

		return blog;
	}

	/**
	 * Fetch blog content from object storage.
	 */
	async getBlogContent(id: string): Promise<string> {
		const contentBuffer = await this.storage.getObject(`blogs/${id}/content`);
		return contentBuffer?.toString('utf-8') ?? '';
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
			ops.push(
				this.storage.putObject(
					`blogs/${id}/content`,
					Buffer.from(dto.content),
					'text/plain; charset=utf-8'
				)
			);
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

	async likeBlog(userId: string, blogId: string): Promise<void> {
		const blogRef = this.collection.doc(blogId);
		const likeRef = blogRef.collection('likes').doc(userId);

		const blogDoc = await blogRef.get();
		if (!blogDoc.exists) throw ErrorCodes.BLOG.NOT_FOUND;

		const batch = this.firebase.db.batch();
		batch.set(likeRef, {
			userId,
			createdAt: FieldValue.serverTimestamp(),
		});
		batch.update(blogRef, {
			likeCount: FieldValue.increment(1),
			updatedAt: FieldValue.serverTimestamp(),
		});

		await batch.commit();
	}

	async unlikeBlog(userId: string, blogId: string): Promise<void> {
		const blogRef = this.collection.doc(blogId);
		const likeRef = blogRef.collection('likes').doc(userId);

		const [blogDoc, likeDoc] = await Promise.all([blogRef.get(), likeRef.get()]);

		if (!blogDoc.exists) throw ErrorCodes.BLOG.NOT_FOUND;
		if (!likeDoc.exists) return;

		const batch = this.firebase.db.batch();
		batch.delete(likeRef);
		batch.update(blogRef, {
			likeCount: FieldValue.increment(-1),
			updatedAt: FieldValue.serverTimestamp(),
		});

		await batch.commit();
	}
}
