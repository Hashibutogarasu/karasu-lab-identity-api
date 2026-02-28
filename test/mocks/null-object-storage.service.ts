/* eslint-disable @typescript-eslint/no-unsafe-return */
import type { IObjectStorage } from '../../src/storage/object-storage.interface.js';

/** In-memory implementation of IObjectStorage for use in unit/integration tests. */
export class NullObjectStorageService implements IObjectStorage {
  private readonly store = new Map<string, Buffer>();

  getPresignedUrl(key: string): Promise<string> {
    return Promise.resolve(`https://test-stub/${key}`);
  }

  putObject(key: string, body: Buffer | Uint8Array): Promise<void> {
    this.store.set(key, Buffer.isBuffer(body) ? body : Buffer.from(body));
    return Promise.resolve();
  }

  getContentType(): Promise<string | undefined> {
    return Promise.resolve(undefined);
  }

  getObject(key: string): Promise<Buffer | null> {
    return Promise.resolve(this.store.get(key) ?? null);
  }

  deleteObject(key: string): Promise<void> {
    this.store.delete(key);
    return Promise.resolve();
  }

  listObjects(): Promise<string[]> {
    return Promise.resolve([]);
  }
}
