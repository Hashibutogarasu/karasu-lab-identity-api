export interface StorageOptions {
  endpoint: string;
  accessKeyId: string;
  secretAccessKey: string;
  bucket: string;
  publicUrl?: string;
}

export interface StorageAsyncOptions {
  useFactory: (...args: any[]) => Promise<StorageOptions> | StorageOptions;
  inject?: any[];
}
