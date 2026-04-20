import { DynamicModule, Global, Module } from '@nestjs/common';

import { STORAGE_OPTIONS } from './storage.constants.js';
import { ObjectStorageService } from './object-storage.service.js';
import { IObjectStorageService } from './object-storage.interface.js';
import type {
  StorageAsyncOptions,
  StorageOptions,
} from './storage-options.interface.js';

@Global()
@Module({})
export class StorageModule {
  static forRoot(options: StorageOptions): DynamicModule {
    return {
      module: StorageModule,
      providers: [
        {
          provide: STORAGE_OPTIONS,
          useValue: options,
        },
        {
          provide: IObjectStorageService,
          useClass: ObjectStorageService,
        },
      ],
      exports: [IObjectStorageService],
    };
  }

  static forRootAsync(options: StorageAsyncOptions): DynamicModule {
    return {
      module: StorageModule,
      imports: [],
      providers: [
        {
          provide: STORAGE_OPTIONS,
          useFactory: options.useFactory,
          inject: options.inject || [],
        },
        {
          provide: IObjectStorageService,
          useClass: ObjectStorageService,
        },
      ],
      exports: [IObjectStorageService, STORAGE_OPTIONS],
    };
  }
}
