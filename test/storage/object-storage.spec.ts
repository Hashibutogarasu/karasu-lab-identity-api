import { afterAll, beforeAll, describe, expect, it, vi } from 'vite-plus/test';

import { NullObjectStorageService } from '../mocks/null-object-storage.service.js';
import { IObjectStorage } from '../../src/storage/object-storage.interface.js';

/**
 * ObjectStorageService tests using a mock implementation.
 */
describe('ObjectStorageService', () => {
  let service: IObjectStorage;

  const testKey = `test/${Date.now()}-sample.txt`;
  const testBody = Buffer.from('Hello, Cloudflare R2!');
  const testContentType = 'text/plain';

  beforeAll(() => {
    service = new NullObjectStorageService();

    vi.stubGlobal('fetch', async (url: string) => {
      if (url.startsWith('https://test-stub/')) {
        const key = url.split('https://test-stub/')[1].split('?')[0];
        const data = await service.getObject(key);
        if (data) {
          return {
            ok: true,
            text: () => Promise.resolve(data.toString()),
            buffer: () => Promise.resolve(data),
          };
        }
        return { ok: false, status: 404 };
      }
      throw new Error(`Unexpected fetch call to ${url}`);
    });
  });

  afterAll(async () => {
    vi.unstubAllGlobals();
    try {
      await service.deleteObject(testKey);
    } catch {
      // ignore
    }
  });

  describe('putObject', () => {
    it('uploads an object without throwing', async () => {
      await expect(
        service.putObject(testKey, testBody, testContentType),
      ).resolves.not.toThrow();
    });
  });

  describe('getContentType', () => {
    it('returns the Content-Type of an existing object', async () => {
      const contentType = await service.getContentType(testKey);
      expect(contentType).toBe(testContentType);
    });

    it('returns undefined for a non-existent object', async () => {
      const contentType = await service.getContentType('non-existent/file.txt');
      expect(contentType).toBeUndefined();
    });
  });

  describe('listObjects', () => {
    it('returns object keys filtered by prefix', async () => {
      const keys = await service.listObjects('test/');
      expect(keys).toContain(testKey);
    });

    it('returns all object keys when no prefix is given', async () => {
      const keys = await service.listObjects();
      expect(Array.isArray(keys)).toBe(true);
    });

    it('returns an empty array for a prefix with no matching objects', async () => {
      const keys = await service.listObjects('no-such-prefix-xyz/');
      expect(keys).toEqual([]);
    });
  });

  describe('getPresignedUrl', () => {
    it('returns a valid presigned URL', async () => {
      const url = await service.getPresignedUrl(testKey);
      expect(url).toMatch(/^https?:\/\//);
      expect(url).toContain(testKey);
    });

    it('allows fetching the object via the presigned URL', async () => {
      const url = await service.getPresignedUrl(testKey);
      const res = await fetch(url);
      expect(res.ok).toBe(true);
      const text = await res.text();
      expect(text).toBe('Hello, Cloudflare R2!');
    });

    it('includes the specified expiry in the presigned URL', async () => {
      const url = await service.getPresignedUrl(testKey, 60);
      expect(url).toMatch(/X-Amz-Expires=60/);
    });
  });

  describe('deleteObject', () => {
    it('deletes an object without throwing', async () => {
      await expect(service.deleteObject(testKey)).resolves.not.toThrow();
    });

    it('returns undefined for Content-Type after deletion', async () => {
      const contentType = await service.getContentType(testKey);
      expect(contentType).toBeUndefined();
    });

    it('excludes the deleted object from the listing', async () => {
      const keys = await service.listObjects('test/');
      expect(keys).not.toContain(testKey);
    });
  });
});
