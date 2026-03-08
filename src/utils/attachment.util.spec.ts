import { describe, it, expect } from 'vitest';
import { mapAttachments } from './attachment.util.js';

describe('Attachment utilities', () => {
  describe('mapAttachments', () => {
    it('should map Firestore documents to AttachmentData', () => {
      const mockDocs = {
        docs: [
          {
            id: 'attachment-1',
            data: () => ({
              blogId: 'blog-1',
              key: 'blogs/blog-1/attachments/attachment-1',
              contentType: 'image/png',
              size: 2048,
              status: 'published',
              authorId: 'user-1',
              createdAt: {
                toDate: () => new Date('2026-03-08T10:00:00Z'),
              },
              updatedAt: {
                toDate: () => new Date('2026-03-08T11:00:00Z'),
              },
            }),
          },
          {
            id: 'attachment-2',
            data: () => ({
              blogId: 'blog-1',
              key: 'blogs/blog-1/attachments/attachment-2',
              contentType: 'image/jpeg',
              size: 3072,
              status: 'draft',
              authorId: 'user-1',
              createdAt: {
                toDate: () => new Date('2026-03-08T12:00:00Z'),
              },
              updatedAt: {
                toDate: () => new Date('2026-03-08T13:00:00Z'),
              },
            }),
          },
        ],
      } as unknown as FirebaseFirestore.QuerySnapshot;

      const result = mapAttachments(mockDocs);

      expect(result).toHaveLength(2);
      expect(result[0].id).toBe('attachment-1');
      expect(result[0].contentType).toBe('image/png');
      expect(result[0].createdAt).toBe('2026-03-08T10:00:00.000Z');
      expect(result[0].updatedAt).toBe('2026-03-08T11:00:00.000Z');
      expect(result[1].id).toBe('attachment-2');
      expect(result[1].contentType).toBe('image/jpeg');
    });

    it('should handle empty document list', () => {
      const mockDocs = {
        docs: [],
      } as unknown as FirebaseFirestore.QuerySnapshot;

      const result = mapAttachments(mockDocs);
      expect(result).toEqual([]);
    });

    it('should handle attachments with string timestamps', () => {
      const mockDocs = {
        docs: [
          {
            id: 'attachment-3',
            data: () => ({
              blogId: 'blog-2',
              key: 'blogs/blog-2/attachments/attachment-3',
              contentType: 'application/pdf',
              size: 5120,
              status: 'published',
              authorId: 'user-2',
              createdAt: '2026-03-08T10:00:00.000Z',
              updatedAt: '2026-03-08T11:00:00.000Z',
            }),
          },
        ],
      } as unknown as FirebaseFirestore.QuerySnapshot;

      const result = mapAttachments(mockDocs);
      expect(result).toHaveLength(1);
      expect(result[0].createdAt).toBe('2026-03-08T10:00:00.000Z');
    });

    it('should preserve all attachment fields', () => {
      const mockDocs = {
        docs: [
          {
            id: 'test-id',
            data: () => ({
              blogId: 'test-blog',
              key: 'test-key',
              contentType: 'text/plain',
              size: 1024,
              status: 'draft',
              authorId: 'test-user',
              createdAt: {
                toDate: () => new Date('2026-01-01T00:00:00Z'),
              },
              updatedAt: {
                toDate: () => new Date('2026-01-02T00:00:00Z'),
              },
            }),
          },
        ],
      } as unknown as FirebaseFirestore.QuerySnapshot;

      const result = mapAttachments(mockDocs);
      const attachment = result[0];

      expect(attachment.blogId).toBe('test-blog');
      expect(attachment.key).toBe('test-key');
      expect(attachment.contentType).toBe('text/plain');
      expect(attachment.size).toBe(1024);
      expect(attachment.status).toBe('draft');
      expect(attachment.authorId).toBe('test-user');
    });
  });
});
