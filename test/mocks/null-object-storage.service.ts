/* eslint-disable @typescript-eslint/no-unsafe-return */
import type { IObjectStorage } from '../../src/storage/object-storage.interface.js';

/** No-op implementation of IObjectStorage for use in unit/integration tests. */
export class NullObjectStorageService implements IObjectStorage {
  getPresignedUrl(key: string): Promise<string> {
    return Promise.resolve(`https://test-stub/${key}`);
  }

  putObject(): Promise<void> {
    return Promise.resolve();
  }

  getContentType(): Promise<string | undefined> {
    return Promise.resolve(undefined);
  }

  deleteObject(): Promise<void> {
    return Promise.resolve();
  }

  listObjects(): Promise<string[]> {
    return Promise.resolve([]);
  }
}
