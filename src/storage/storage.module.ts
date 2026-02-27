import { Global, Module } from "@nestjs/common";

import { IObjectStorageService } from "./object-storage.interface.js";
import { ObjectStorageService } from "./object-storage.service.js";

/**
 * Cloudflare R2 object storage module.
 * Decorated with @Global() so it is available throughout the application
 * without re-importing in each feature module.
 *
 * @example
 * // Register once in AppModule
 * imports: [StorageModule]
 *
 * // Inject anywhere
 * constructor(@Inject(IObjectStorageService) private storage: IObjectStorage) {}
 */
@Global()
@Module({
  providers: [
    {
      provide: IObjectStorageService,
      useClass: ObjectStorageService,
    },
  ],
  exports: [IObjectStorageService],
})
export class StorageModule {}
