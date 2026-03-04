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

  /**
   * Returns a stub presigned upload URL for the given key and content type.
   * @param key         Object key
   * @param contentType MIME type of the object to be uploaded
   * @param expiresIn   Expiry duration in seconds
   */
  getPresignedUploadUrl(
    key: string,
    contentType: string,
    expiresIn?: number,
  ): Promise<string> {
    let url = `https://test-stub/upload/${key}?content-type=${encodeURIComponent(contentType)}`;
    if (expiresIn) {
      url += `&X-Amz-Expires=${expiresIn}`;
    }
    return Promise.resolve(url);
  }

  /**
   * Returns metadata for an object that was previously stored via putObject.
   * Returns null when no object is found for the given key.
   * @param key Object key
   */
  getObjectMetadata(
    key: string,
  ): Promise<{ contentType: string; size: number } | null> {
    const obj = this.store.get(key);
    if (!obj) return Promise.resolve(null);
    return Promise.resolve({
      contentType: obj.contentType ?? 'application/octet-stream',
      size: obj.body.length,
    });
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
