import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import { ErrorDefinition } from '../../src/shared/errors/error.codes.js';
import { getPrisma } from '../../src/prisma.js';
import { NullObjectStorageService } from '../mocks/null-object-storage.service.js';
import { BlogService } from '../../src/blogs/blog.service.js';
import { AttachmentService, MAX_ATTACHMENT_SIZE } from '../../src/attachments/attachment.service.js';
import { IFirebaseAdminProvider } from '../../src/shared/firebase/firebase-admin.provider.interface.js';
import { MockFirebaseAdminProvider } from '../mocks/firebase-admin.provider.mock.js';

/**
 * BlogService E2E tests.
 *
 * Runs against the real PostgreSQL database for users,
 * and uses the real Firestore for Blog/Attachment metadata.
 * Object storage calls are handled by NullObjectStorageService (no-op stub).
 * All test data is cleaned up in afterAll.
 */
describe('BlogService (E2E)', () => {
	let service: BlogService;
	let attachmentService: AttachmentService;
	let storage: NullObjectStorageService;
	let firebaseProvider: IFirebaseAdminProvider;
	const prisma = getPrisma();

	const suffix = Date.now();
	const ownerUserId = `e2e-blog-owner-${suffix}`;
	const otherUserId = `e2e-blog-other-${suffix}`;

	const smallFile = {
		fieldname: 'file',
		originalname: 'test.png',
		encoding: '7bit',
		buffer: Buffer.from('fake image data'),
		mimetype: 'image/png',
		size: 15,
	};

	beforeAll(async () => {
		storage = new NullObjectStorageService();

		firebaseProvider = new MockFirebaseAdminProvider();
		await firebaseProvider.onModuleInit();

		attachmentService = new AttachmentService(storage, firebaseProvider);
		service = new BlogService(storage, firebaseProvider, attachmentService);
		await prisma.user.createMany({
			data: [
				{
					id: ownerUserId,
					name: 'E2E Blog Owner',
					email: `e2e-blog-owner-${suffix}@example.com`,
					emailVerified: true,
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					id: otherUserId,
					name: 'E2E Blog Other',
					email: `e2e-blog-other-${suffix}@example.com`,
					emailVerified: true,
					createdAt: new Date(),
					updatedAt: new Date(),
				},
			],
		});
	});

	afterAll(async () => {
		try {
			await fetch(
				`http://127.0.0.1:8080/emulator/v1/projects/${IFirebaseAdminProvider.DUMMY_PROJECT_ID}/databases/(default)/documents`,
				{ method: 'DELETE' }
			);
		} catch {
			// ignore
		}

		await prisma.user.deleteMany({
			where: { id: { in: [ownerUserId, otherUserId] } },
		});
	});

  describe('listBlogs', () => {
    it('anonymous: returns only published blogs', async () => {
      const draft = await service.createBlog(ownerUserId, { title: 'Test Blog', content: 'Draft', status: 'draft' });
      const published = await service.createBlog(ownerUserId, {
        title: 'Test Blog',
        content: 'Published',
        status: 'published',
      });

      const blogs = await service.listBlogs();
      const ids = blogs.data.map((b) => b.id);
      expect(ids).toContain(published.id);
      expect(ids).not.toContain(draft.id);
    });

    it('authenticated owner: sees own posts of all statuses', async () => {
      const draft = await service.createBlog(ownerUserId, {
        title: 'Test Blog',
        content: 'My draft',
        status: 'draft',
      });
      const archived = await service.createBlog(ownerUserId, {
        title: 'Test Blog',
        content: 'My archived',
        status: 'archived',
      });
      const published = await service.createBlog(ownerUserId, {
        title: 'Test Blog',
        content: 'My published',
        status: 'published',
      });

      const blogs = await service.listBlogs(ownerUserId);
      const ids = blogs.data.map((b) => b.id);
      expect(ids).toContain(draft.id);
      expect(ids).toContain(archived.id);
      expect(ids).toContain(published.id);
    });

    it('authenticated non-owner: sees only published posts from others', async () => {
      const draft = await service.createBlog(ownerUserId, {
        title: 'Test Blog',
        content: 'Owner draft',
        status: 'draft',
      });
      const published = await service.createBlog(ownerUserId, {
        title: 'Test Blog',
        content: 'Owner published',
        status: 'published',
      });

      const blogs = await service.listBlogs(otherUserId);
      const ids = blogs.data.map((b) => b.id);
      expect(ids).toContain(published.id);
      expect(ids).not.toContain(draft.id);
    });

    it('each entry includes attachments array', async () => {
      const blog = await service.createBlog(ownerUserId, {
        title: 'Test Blog',
        content: 'With attachments field',
        status: 'published',
      });
      const blogs = await service.listBlogs();
      const found = blogs.data.find((b) => b.id === blog.id);
      expect(found?.attachments).toBeInstanceOf(Array);
    });

    it('returns results in descending createdAt order', async () => {
      const blogs = await service.listBlogs(ownerUserId);
      for (let i = 1; i < blogs.data.length; i++) {
        expect(new Date(blogs.data[i - 1].createdAt).getTime()).toBeGreaterThanOrEqual(
          new Date(blogs.data[i].createdAt).getTime(),
        );
      }
    });
  });

  describe('listAttachments', () => {
    it('anonymous: returns only published attachments', async () => {
      const blog = await service.createBlog(ownerUserId, {
        title: 'Test Blog',
        content: 'Attachment visibility',
        status: 'published',
      });
      const draftAttachment = await attachmentService.createAttachment(blog.id, ownerUserId, smallFile, {
        status: 'draft',
      });
      const publishedAttachment = await attachmentService.createAttachment(blog.id, ownerUserId, smallFile, {
        status: 'published',
      });

      const attachments = await attachmentService.listAttachments();
      const ids = attachments.map((a) => a.id);
      expect(ids).toContain(publishedAttachment.id);
      expect(ids).not.toContain(draftAttachment.id);

      await attachmentService.deleteAttachment(draftAttachment.id, ownerUserId);
      await attachmentService.deleteAttachment(publishedAttachment.id, ownerUserId);
    });

    it('authenticated owner: sees own attachments of all statuses', async () => {
      const blog = await service.createBlog(ownerUserId, {
        title: 'Test Blog',
        content: 'For owner attachment list',
        status: 'published',
      });
      const draftAttachment = await attachmentService.createAttachment(blog.id, ownerUserId, smallFile, {
        status: 'draft',
      });
      const publishedAttachment = await attachmentService.createAttachment(blog.id, ownerUserId, smallFile, {
        status: 'published',
      });
      const archivedAttachment = await attachmentService.createAttachment(blog.id, ownerUserId, smallFile, {
        status: 'archived',
      });

      const attachments = await attachmentService.listAttachments(ownerUserId);
      const ids = attachments.map((a) => a.id);
      expect(ids).toContain(draftAttachment.id);
      expect(ids).toContain(publishedAttachment.id);
      expect(ids).toContain(archivedAttachment.id);

      await attachmentService.deleteAttachment(draftAttachment.id, ownerUserId);
      await attachmentService.deleteAttachment(publishedAttachment.id, ownerUserId);
      await attachmentService.deleteAttachment(archivedAttachment.id, ownerUserId);
    });

    it('status is persisted on create', async () => {
      const blog = await service.createBlog(ownerUserId, {
        title: 'Test Blog',
        content: 'Status persist check',
        status: 'published',
      });
      const attachment = await attachmentService.createAttachment(blog.id, ownerUserId, smallFile, {
        status: 'published',
      });
      expect(attachment.status).toBe('published');

      await attachmentService.deleteAttachment(attachment.id, ownerUserId);
    });

    it('status is updated on updateAttachment', async () => {
      const blog = await service.createBlog(ownerUserId, {
        title: 'Test Blog',
        content: 'Status update check',
        status: 'published',
      });
      const attachment = await attachmentService.createAttachment(blog.id, ownerUserId, smallFile, {
        status: 'draft',
      });
      const updated = await attachmentService.updateAttachment(attachment.id, ownerUserId, smallFile, {
        status: 'published',
      });
      expect(updated.status).toBe('published');

      await attachmentService.deleteAttachment(attachment.id, ownerUserId);
    });

    it('returns results in descending createdAt order', async () => {
      const attachments = await attachmentService.listAttachments(ownerUserId);
      for (let i = 1; i < attachments.length; i++) {
        expect(new Date(attachments[i - 1].createdAt).getTime()).toBeGreaterThanOrEqual(
          new Date(attachments[i].createdAt).getTime(),
        );
      }
    });

    it('authenticated non-owner: cannot see draft attachments from others', async () => {
      const blog = await service.createBlog(ownerUserId, {
        title: 'Test Blog',
        content: 'Attachment visibility',
        status: 'published',
      });
      const draftAttachment = await attachmentService.createAttachment(blog.id, ownerUserId, smallFile, {
        status: 'draft',
      });

      const attachments = await attachmentService.listAttachments(otherUserId);
      const ids = attachments.map((a) => a.id);
      expect(ids).not.toContain(draftAttachment.id);

      await attachmentService.deleteAttachment(draftAttachment.id, ownerUserId);
    });
  });

  describe('createBlog', () => {
    it('creates a blog with default draft status', async () => {
      const blog = await service.createBlog(ownerUserId, { title: 'Test Blog', content: 'Hello World' });
      expect(blog.id).toBeDefined();
      expect(blog.content).toBe('Hello World');
      expect(blog.status).toBe('draft');
      expect(blog.authorId).toBe(ownerUserId);
      expect(blog.attachments).toEqual([]);
    });

    it('creates a blog with an explicit status', async () => {
      const blog = await service.createBlog(ownerUserId, {
        title: 'Test Blog',
        content: 'Published post',
        status: 'published',
      });
      expect(blog.status).toBe('published');
    });
  });

  describe('getBlog', () => {
    it('returns an existing blog with its attachments', async () => {
      const created = await service.createBlog(ownerUserId, { title: 'Test Blog', content: 'Fetch me' });
      const fetched = await service.getBlog(created.id, ownerUserId);
      expect(fetched.id).toBe(created.id);
      expect(fetched.attachments).toBeInstanceOf(Array);
    });

    it('throws NOT_FOUND for a non-existent blog', async () => {
      await expect(service.getBlog('non-existent-id')).rejects.toThrow(ErrorDefinition);
    });

    it('draft: owner can fetch own draft', async () => {
      const draft = await service.createBlog(ownerUserId, { title: 'Test Blog', content: 'My draft', status: 'draft' });
      const fetched = await service.getBlog(draft.id, ownerUserId);
      expect(fetched.id).toBe(draft.id);
    });

    it('draft: non-owner cannot fetch draft → FORBIDDEN', async () => {
      const draft = await service.createBlog(ownerUserId, {
        title: 'Test Blog',
        content: 'Hidden draft',
        status: 'draft',
      });
      await expect(service.getBlog(draft.id, otherUserId)).rejects.toMatchObject({
        status: 'FORBIDDEN',
      });
    });

    it('draft: anonymous cannot fetch draft → FORBIDDEN', async () => {
      const draft = await service.createBlog(ownerUserId, {
        title: 'Test Blog',
        content: 'Anon hidden draft',
        status: 'draft',
      });
      await expect(service.getBlog(draft.id)).rejects.toMatchObject({
        status: 'FORBIDDEN',
      });
    });
  });

  describe('status changes', () => {
    it('transitions from draft to published', async () => {
      const blog = await service.createBlog(ownerUserId, { title: 'Test Blog', content: 'Draft content' });
      const updated = await service.updateBlog(blog.id, ownerUserId, { status: 'published' });
      expect(updated.status).toBe('published');
    });

    it('transitions from published to archived', async () => {
      const blog = await service.createBlog(ownerUserId, {
        title: 'Test Blog',
        content: 'Going to archive',
        status: 'published',
      });
      const updated = await service.updateBlog(blog.id, ownerUserId, { status: 'archived' });
      expect(updated.status).toBe('archived');
    });

    it('updates content along with status', async () => {
      const blog = await service.createBlog(ownerUserId, { title: 'Test Blog', content: 'Old content' });
      const updated = await service.updateBlog(blog.id, ownerUserId, {
        content: 'New content',
        status: 'published',
      });
      expect(updated.content).toBe('New content');
      expect(updated.status).toBe('published');
    });
  });

  describe('locked blog', () => {
    it('prevents updating a locked blog', async () => {
      const blog = await service.createBlog(ownerUserId, {
        title: 'Test Blog',
        content: 'Locked post',
        status: 'locked',
      });
      await expect(
        service.updateBlog(blog.id, ownerUserId, { content: 'Changed' }),
      ).rejects.toMatchObject({ status: 'FORBIDDEN' });
    });

    it('prevents uploading an attachment to a locked blog', async () => {
      const blog = await service.createBlog(ownerUserId, {
        title: 'Test Blog',
        content: 'Locked for attachments',
        status: 'locked',
      });
      await expect(
        attachmentService.createAttachment(blog.id, ownerUserId, smallFile, {}),
      ).rejects.toMatchObject({ status: 'FORBIDDEN' });
    });

    it('prevents deleting a locked blog', async () => {
      const blog = await service.createBlog(ownerUserId, {
        title: 'Test Blog',
        content: 'Locked delete',
        status: 'locked',
      });
      await expect(service.deleteBlog(blog.id, ownerUserId)).rejects.toMatchObject({
        status: 'FORBIDDEN',
      });
    });

    it('prevents updating an attachment on a locked blog', async () => {
      const blog = await service.createBlog(ownerUserId, {
        title: 'Test Blog',
        content: 'Locked for attachment update',
      });
      const attachment = await attachmentService.createAttachment(blog.id, ownerUserId, smallFile, {});
      await service.updateBlog(blog.id, ownerUserId, { status: 'locked' });

      await expect(
        attachmentService.updateAttachment(attachment.id, ownerUserId, smallFile, {}),
      ).rejects.toMatchObject({ status: 'FORBIDDEN' });
    });

    it('prevents deleting an attachment on a locked blog', async () => {
      const blog = await service.createBlog(ownerUserId, {
        title: 'Test Blog',
        content: 'Locked for attachment delete',
      });
      const attachment = await attachmentService.createAttachment(blog.id, ownerUserId, smallFile, {});
      await service.updateBlog(blog.id, ownerUserId, { status: 'locked' });

      await expect(
        attachmentService.deleteAttachment(attachment.id, ownerUserId),
      ).rejects.toMatchObject({ status: 'FORBIDDEN' });
    });
  });

  describe('permissions', () => {
    it('prevents a non-owner from updating a blog', async () => {
      const blog = await service.createBlog(ownerUserId, { title: 'Test Blog', content: 'Owner only' });
      await expect(
        service.updateBlog(blog.id, otherUserId, { content: 'Hacked' }),
      ).rejects.toThrow(ErrorDefinition);
    });

    it('prevents a non-owner from deleting a blog', async () => {
      const blog = await service.createBlog(ownerUserId, { title: 'Test Blog', content: 'Cannot delete' });
      await expect(service.deleteBlog(blog.id, otherUserId)).rejects.toThrow(ErrorDefinition);
    });

    it('prevents a non-owner from deleting an attachment', async () => {
      const blog = await service.createBlog(ownerUserId, { title: 'Test Blog', content: 'With attachment' });
      const attachment = await attachmentService.createAttachment(blog.id, ownerUserId, smallFile, {});
      await expect(attachmentService.deleteAttachment(attachment.id, otherUserId)).rejects.toThrow(
        ErrorDefinition,
      );
      await attachmentService.deleteAttachment(attachment.id, ownerUserId);
    });

    it('prevents a non-owner from updating an attachment', async () => {
      const blog = await service.createBlog(ownerUserId, { title: 'Test Blog', content: 'Attachment owner' });
      const attachment = await attachmentService.createAttachment(blog.id, ownerUserId, smallFile, {});
      await expect(
        attachmentService.updateAttachment(attachment.id, otherUserId, smallFile, {}),
      ).rejects.toThrow(ErrorDefinition);
      await attachmentService.deleteAttachment(attachment.id, ownerUserId);
    });
  });

  describe('deleteBlog', () => {
    it('deletes a blog and makes it unretrievable', async () => {
      const blog = await service.createBlog(ownerUserId, { title: 'Test Blog', content: 'To be deleted' });
      await service.deleteBlog(blog.id, ownerUserId);
      await expect(service.getBlog(blog.id)).rejects.toThrow(ErrorDefinition);
    });

    it('throws NOT_FOUND when deleting a non-existent blog', async () => {
      await expect(service.deleteBlog('ghost-id', ownerUserId)).rejects.toThrow(ErrorDefinition);
    });
  });

  describe('createAttachment', () => {
    it('uploads an attachment and returns metadata', async () => {
      const blog = await service.createBlog(ownerUserId, { title: 'Test Blog', content: 'With file' });
      const attachment = await attachmentService.createAttachment(blog.id, ownerUserId, smallFile, {});

      expect(attachment.id).toBeDefined();
      expect(attachment.blogId).toBe(blog.id);
      expect(attachment.contentType).toBe('image/png');
      expect(attachment.size).toBe(smallFile.size);
      expect(attachment.key).toContain(blog.id);

      await attachmentService.deleteAttachment(attachment.id, ownerUserId);
    });

    it('throws NOT_FOUND when the blog does not exist', async () => {
      await expect(
        attachmentService.createAttachment('no-such-blog', ownerUserId, smallFile, {}),
      ).rejects.toThrow(ErrorDefinition);
    });
  });

  describe('getAttachment', () => {
    it('returns a presigned URL and metadata for an existing attachment', async () => {
      const blog = await service.createBlog(ownerUserId, { title: 'Test Blog', content: 'For presign' });
      const attachment = await attachmentService.createAttachment(blog.id, ownerUserId, smallFile, {});

      const result = await attachmentService.getAttachment(attachment.id);
      expect(result.url).toMatch(/^https?:\/\//);
      expect(result.metadata.id).toBe(attachment.id);

      await attachmentService.deleteAttachment(attachment.id, ownerUserId);
    });

    it('throws ATTACHMENT_NOT_FOUND for a non-existent attachment', async () => {
      await expect(attachmentService.getAttachment('ghost-attachment')).rejects.toThrow(ErrorDefinition);
    });
  });

  describe('updateAttachment', () => {
    it('replaces the file and updates metadata', async () => {
      const blog = await service.createBlog(ownerUserId, { title: 'Test Blog', content: 'Update attachment' });
      const attachment = await attachmentService.createAttachment(blog.id, ownerUserId, smallFile, {});

      const newFile = {
        fieldname: 'file',
        originalname: 'updated.jpg',
        encoding: '7bit',
        buffer: Buffer.from('updated data'),
        mimetype: 'image/jpeg',
        size: 12
      };
      const updated = await attachmentService.updateAttachment(attachment.id, ownerUserId, newFile, {});

      expect(updated.contentType).toBe('image/jpeg');
      expect(updated.size).toBe(12);

      await attachmentService.deleteAttachment(attachment.id, ownerUserId);
    });
  });

  describe('deleteAttachment', () => {
    it('removes the attachment from the database', async () => {
      const blog = await service.createBlog(ownerUserId, { title: 'Test Blog', content: 'Delete attachment' });
      const attachment = await attachmentService.createAttachment(blog.id, ownerUserId, smallFile, {});

      await attachmentService.deleteAttachment(attachment.id, ownerUserId);
      await expect(attachmentService.getAttachment(attachment.id)).rejects.toThrow(ErrorDefinition);
    });
  });

  describe('attachment Firestore presence', () => {
    it('returns FORBIDDEN when a non-owner attempts to delete an attachment', async () => {
      const blog = await service.createBlog(ownerUserId, { title: 'Test Blog', content: 'perm test' });
      const att = await attachmentService.createAttachment(blog.id, ownerUserId, smallFile, {});
      await expect(attachmentService.deleteAttachment(att.id, otherUserId)).rejects.toMatchObject({
        status: 'FORBIDDEN',
        key: 'blog.forbidden',
      });
      await attachmentService.deleteAttachment(att.id, ownerUserId);
    });

    it('persists the attachment document in Firestore after createAttachment', async () => {
      const blog = await service.createBlog(ownerUserId, { title: 'Test Blog', content: 'firestore check' });
      const att = await attachmentService.createAttachment(blog.id, ownerUserId, smallFile, {});
      const doc = await firebaseProvider.db.collection('attachments').doc(att.id).get();
      expect(doc.exists).toBe(true);
      expect(doc.data()?.blogId).toBe(blog.id);
      expect(doc.data()?.authorId).toBe(ownerUserId);
      await attachmentService.deleteAttachment(att.id, ownerUserId);
    });

    it('removes the attachment document from Firestore after deleteAttachment', async () => {
      const blog = await service.createBlog(ownerUserId, { title: 'Test Blog', content: 'delete check' });
      const att = await attachmentService.createAttachment(blog.id, ownerUserId, smallFile, {});
      await attachmentService.deleteAttachment(att.id, ownerUserId);
      const doc = await firebaseProvider.db.collection('attachments').doc(att.id).get();
      expect(doc.exists).toBe(false);
    });
  });

  describe('file size boundary', () => {
    it('accepts a file exactly at the limit', async () => {
      const blog = await service.createBlog(ownerUserId, { title: 'Test Blog', content: 'Size boundary' });
      const exactFile = {
        fieldname: 'file',
        originalname: 'exact.png',
        encoding: '7bit',
        buffer: Buffer.alloc(MAX_ATTACHMENT_SIZE),
        mimetype: 'image/png',
        size: MAX_ATTACHMENT_SIZE,
      };
      const attachment = await attachmentService.createAttachment(blog.id, ownerUserId, exactFile, {});
      expect(attachment.size).toBe(MAX_ATTACHMENT_SIZE);

      await attachmentService.deleteAttachment(attachment.id, ownerUserId);
    });

    it('rejects a file one byte over the limit', async () => {
      const blog = await service.createBlog(ownerUserId, { title: 'Test Blog', content: 'Too large' });
      const oversizedFile = {
        fieldname: 'file',
        originalname: 'oversized.png',
        encoding: '7bit',
        buffer: Buffer.alloc(MAX_ATTACHMENT_SIZE + 1),
        mimetype: 'image/png',
        size: MAX_ATTACHMENT_SIZE + 1,
      };
      await expect(
        attachmentService.createAttachment(blog.id, ownerUserId, oversizedFile, {}),
      ).rejects.toThrow(ErrorDefinition);
    });

    it('rejects an oversized replacement file in updateAttachment', async () => {
      const blog = await service.createBlog(ownerUserId, { title: 'Test Blog', content: 'Update size check' });
      const attachment = await attachmentService.createAttachment(blog.id, ownerUserId, smallFile, {});

      const oversizedFile = {
        fieldname: 'file',
        originalname: 'oversized.png',
        encoding: '7bit',
        buffer: Buffer.alloc(MAX_ATTACHMENT_SIZE + 1),
        mimetype: 'image/png',
        size: MAX_ATTACHMENT_SIZE + 1,
      };
      await expect(
        attachmentService.updateAttachment(attachment.id, ownerUserId, oversizedFile, {}),
      ).rejects.toThrow(ErrorDefinition);

      await attachmentService.deleteAttachment(attachment.id, ownerUserId);
    });
  });
});
