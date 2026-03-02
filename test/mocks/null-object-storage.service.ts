import type { IObjectStorage } from '../../src/storage/object-storage.interface.js';

interface StoredObject {
  body: Buffer;
  contentType?: string;
}

/** In-memory implementation of IObjectStorage for use in unit/integration tests. */
export class NullObjectStorageService implements IObjectStorage {
  private readonly store = new Map<string, StoredObject>();

  getPresignedUrl(key: string, expiresIn?: number): Promise<string> {
    let url = `https://test-stub/${key}`;
    if (expiresIn) {
      url += `?X-Amz-Expires=${expiresIn}`;
    }
    return Promise.resolve(url);
  }

  putObject(key: string, body: Buffer | Uint8Array, contentType?: string): Promise<void> {
    this.store.set(key, {
      body: Buffer.isBuffer(body) ? body : Buffer.from(body),
      contentType,
    });
    return Promise.resolve();
  }

  getContentType(key: string): Promise<string | undefined> {
    return Promise.resolve(this.store.get(key)?.contentType);
  }

  getObject(key: string): Promise<Buffer | null> {
    return Promise.resolve(this.store.get(key)?.body ?? null);
  }

  deleteObject(key: string): Promise<void> {
    this.store.delete(key);
    return Promise.resolve();
  }

  listObjects(prefix?: string): Promise<string[]> {
    const keys = Array.from(this.store.keys());
    if (!prefix) {
      return Promise.resolve(keys);
    }
    return Promise.resolve(keys.filter((key) => key.startsWith(prefix)));
  }
}
