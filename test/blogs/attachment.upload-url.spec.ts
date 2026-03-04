import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import { NullObjectStorageService } from '../mocks/null-object-storage.service.js';
import { BlogService, UPLOAD_PRESIGNED_URL_EXPIRES_IN } from '../../src/blogs/blog.service.js';
import { IFirebaseAdminProvider } from '../../src/shared/firebase/firebase-admin.provider.interface.js';
import { MockFirebaseAdminProvider } from '../mocks/firebase-admin.provider.mock.js';
import { ErrorDefinition } from '../../src/shared/errors/error.codes.js';

/**
 * Unit tests for BlogService.issueAttachmentUploadUrl and
 * BlogService.syncAttachmentFromStorage.
 *
 * Uses NullObjectStorageService (in-memory) and MockFirebaseAdminProvider
 * (Firestore emulator) so no real cloud resources are required.
 */
describe('BlogService — presigned upload URL and sync', () => {
  let service: BlogService;
  let storage: NullObjectStorageService;
  let firebaseProvider: IFirebaseAdminProvider;

  const authorId = 'test-author-upload-url';

  beforeEach(async () => {
    storage = new NullObjectStorageService();
    firebaseProvider = new MockFirebaseAdminProvider();
    await firebaseProvider.onModuleInit();
    service = new BlogService(storage, firebaseProvider);
  });

  afterEach(async () => {
    try {
      await fetch(
        `http://127.0.0.1:8080/emulator/v1/projects/${IFirebaseAdminProvider.DUMMY_PROJECT_ID}/databases/(default)/documents`,
        { method: 'DELETE' },
      );
    } catch {
      // ignore — emulator may not be available in all environments
    }
  });

  describe('issueAttachmentUploadUrl', () => {
    it('returns a presigned upload URL with the expected shape', async () => {
      const blog = await service.createBlog(authorId, {
        content: 'Test blog',
        status: 'published',
      });

      const result = await service.issueAttachmentUploadUrl(blog.id, authorId, {
        contentType: 'image/png',
      });

      expect(result.uploadUrl).toBeDefined();
      expect(typeof result.uploadUrl).toBe('string');
      expect(result.attachmentId).toBeDefined();
      expect(typeof result.attachmentId).toBe('string');
      expect(result.key).toBe(`blogs/${blog.id}/attachments/${result.attachmentId}`);
      expect(result.expiresIn).toBe(UPLOAD_PRESIGNED_URL_EXPIRES_IN);
    });

    it('throws BLOG.NOT_FOUND when the blog does not exist', async () => {
      await expect(
        service.issueAttachmentUploadUrl('nonexistent-blog', authorId, {
          contentType: 'image/png',
        }),
      ).rejects.toBeInstanceOf(ErrorDefinition);
    });

    it('throws BLOG.LOCKED when the blog status is locked', async () => {
      const blog = await service.createBlog(authorId, {
        content: 'Locked blog',
        status: 'locked',
      });

      await expect(
        service.issueAttachmentUploadUrl(blog.id, authorId, {
          contentType: 'image/png',
        }),
      ).rejects.toBeInstanceOf(ErrorDefinition);
    });

    it('does not create a Firestore attachment document', async () => {
      const blog = await service.createBlog(authorId, {
        content: 'No doc blog',
        status: 'published',
      });

      const result = await service.issueAttachmentUploadUrl(blog.id, authorId, {
        contentType: 'image/jpeg',
      });

      const attachments = await service.listAttachments(authorId);
      const ids = attachments.map((a) => a.id);
      expect(ids).not.toContain(result.attachmentId);
    });
  });

  describe('syncAttachmentFromStorage', () => {
    it('creates a Firestore attachment document for an object that exists in storage', async () => {
      const blog = await service.createBlog(authorId, {
        content: 'Sync blog',
        status: 'published',
      });

      const { attachmentId, key } = await service.issueAttachmentUploadUrl(blog.id, authorId, {
        contentType: 'image/png',
      });

      await storage.putObject(key, Buffer.from('fake image data'), 'image/png');

      const attachment = await service.syncAttachmentFromStorage(
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
        content: 'Status sync blog',
        status: 'published',
      });

      const { attachmentId, key } = await service.issueAttachmentUploadUrl(blog.id, authorId, {
        contentType: 'image/webp',
      });

      await storage.putObject(key, Buffer.from('data'), 'image/webp');

      const attachment = await service.syncAttachmentFromStorage(
        attachmentId,
        blog.id,
        authorId,
        { blogId: blog.id, status: 'published' },
      );

      expect(attachment.status).toBe('published');
    });

    it('throws BLOG.NOT_FOUND when the blog does not exist', async () => {
      await expect(
        service.syncAttachmentFromStorage('any-id', 'nonexistent-blog', authorId, {
          blogId: 'nonexistent-blog',
        }),
      ).rejects.toBeInstanceOf(ErrorDefinition);
    });

    it('throws BLOG.LOCKED when the blog status is locked', async () => {
      const blog = await service.createBlog(authorId, {
        content: 'Locked for sync',
        status: 'locked',
      });

      await expect(
        service.syncAttachmentFromStorage('any-id', blog.id, authorId, {
          blogId: blog.id,
        }),
      ).rejects.toBeInstanceOf(ErrorDefinition);
    });

    it('throws BLOG.ATTACHMENT_NOT_FOUND when no object exists in storage', async () => {
      const blog = await service.createBlog(authorId, {
        content: 'Missing object blog',
        status: 'published',
      });

      const { attachmentId } = await service.issueAttachmentUploadUrl(blog.id, authorId, {
        contentType: 'image/png',
      });

      await expect(
        service.syncAttachmentFromStorage(attachmentId, blog.id, authorId, {
          blogId: blog.id,
        }),
      ).rejects.toBeInstanceOf(ErrorDefinition);
    });
  });
});
