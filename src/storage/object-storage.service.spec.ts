import { describe, expect, it, vi, beforeEach } from 'vitest';

const mockStorageConfig: Record<string, string | undefined> = {
  R2_ENDPOINT: 'https://fake.r2.endpoint',
  R2_ACCESS_KEY_ID: 'fake-key',
  R2_SECRET_ACCESS_KEY: 'fake-secret',
  R2_BUCKET: 'test-bucket',
  R2_PUBLIC_URL: undefined,
};

vi.mock('../config/storage.env.js', () => ({
  storageConfig: new Proxy(mockStorageConfig, {
    get: (target, prop) => target[prop as string],
  }),
}));

vi.mock('@aws-sdk/client-s3', () => {
  return {
    S3Client: class {
      send = vi.fn();
    },
    GetObjectCommand: vi.fn(),
    PutObjectCommand: vi.fn(),
    HeadObjectCommand: vi.fn(),
    DeleteObjectCommand: vi.fn(),
    ListObjectsV2Command: vi.fn(),
  };
});

vi.mock('@aws-sdk/s3-request-presigner', () => ({
  getSignedUrl: vi.fn().mockResolvedValue('https://example.com/presigned-url'),
}));

import { ObjectStorageService } from './object-storage.service.js';

describe('ObjectStorageService', () => {
  let service: ObjectStorageService;

  beforeEach(() => {
    mockStorageConfig.publicUrl = undefined;
    service = new ObjectStorageService(mockStorageConfig as any);
  });

  it('falls back to presigned URL when R2_PUBLIC_URL is not configured', async () => {
    const url = await service.getPublicUrl('some/key.png');
    expect(url).toBe('https://example.com/presigned-url');
  });

  it('returns public URL when R2_PUBLIC_URL is configured', async () => {
    mockStorageConfig.publicUrl = 'https://cdn.example.com';
    service = new ObjectStorageService(mockStorageConfig as any);

    const url = await service.getPublicUrl('some/key.png');
    expect(url).toBe('https://cdn.example.com/some/key.png');
  });
});
