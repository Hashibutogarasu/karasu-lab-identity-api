import { afterAll, beforeAll, describe, expect, it } from "vitest";

import { ObjectStorageService } from "../../src/storage/object-storage.service.js";

/**
 * ObjectStorageService E2E tests
 *
 * Runs against the actual Cloudflare R2 bucket (karasu-lab-storage-test).
 * Requires R2_* environment variables to be set in packages/api/.env.
 */
describe("ObjectStorageService (E2E)", () => {
  let service: ObjectStorageService;

  const testKey = `e2e-test/${Date.now()}-sample.txt`;
  const testBody = Buffer.from("Hello, Cloudflare R2!");
  const testContentType = "text/plain";

  beforeAll(() => {
    service = new ObjectStorageService();
  });

  afterAll(async () => {
    // Ensure the test object is cleaned up even if a test fails
    try {
      await service.deleteObject(testKey);
    } catch {
      // Already deleted — ignore
    }
  });

  describe("putObject", () => {
    it("uploads an object without throwing", async () => {
      await expect(
        service.putObject(testKey, testBody, testContentType),
      ).resolves.not.toThrow();
    });
  });

  describe("getContentType", () => {
    it("returns the Content-Type of an existing object", async () => {
      const contentType = await service.getContentType(testKey);
      expect(contentType).toBe(testContentType);
    });

    it("returns undefined for a non-existent object", async () => {
      const contentType = await service.getContentType(
        "non-existent/file.txt",
      );
      expect(contentType).toBeUndefined();
    });
  });

  describe("listObjects", () => {
    it("returns object keys filtered by prefix", async () => {
      const keys = await service.listObjects("e2e-test/");
      expect(keys).toContain(testKey);
    });

    it("returns all object keys when no prefix is given", async () => {
      const keys = await service.listObjects();
      expect(Array.isArray(keys)).toBe(true);
    });

    it("returns an empty array for a prefix with no matching objects", async () => {
      const keys = await service.listObjects("no-such-prefix-xyz/");
      expect(keys).toEqual([]);
    });
  });

  describe("getPresignedUrl", () => {
    it("returns a valid presigned URL", async () => {
      const url = await service.getPresignedUrl(testKey);
      expect(url).toMatch(/^https?:\/\//);
      expect(url).toContain(testKey);
    });

    it("allows fetching the object via the presigned URL", async () => {
      const url = await service.getPresignedUrl(testKey);
      const res = await fetch(url);
      expect(res.ok).toBe(true);
      const text = await res.text();
      expect(text).toBe("Hello, Cloudflare R2!");
    });

    it("includes the specified expiry in the presigned URL", async () => {
      const url = await service.getPresignedUrl(testKey, 60);
      expect(url).toMatch(/X-Amz-Expires=60/);
    });
  });

  describe("deleteObject", () => {
    it("deletes an object without throwing", async () => {
      await expect(service.deleteObject(testKey)).resolves.not.toThrow();
    });

    it("returns undefined for Content-Type after deletion", async () => {
      const contentType = await service.getContentType(testKey);
      expect(contentType).toBeUndefined();
    });

    it("excludes the deleted object from the listing", async () => {
      const keys = await service.listObjects("e2e-test/");
      expect(keys).not.toContain(testKey);
    });
  });
});
