/** Injection token for IObjectStorage */
export const IObjectStorageService = "IObjectStorageService";

/**
 * Interface for object storage operations targeting S3-compatible storage
 * such as Cloudflare R2.
 */
export interface IObjectStorage {
  /**
   * Returns the public URL for the given object key.
   * Falls back to a presigned URL if no public domain is configured.
   */
  getPublicUrl(key: string): Promise<string>;

  /**
   * Issues a temporary presigned URL for the given object key.
   * @param key       Object key
   * @param expiresIn Expiry duration in seconds. Defaults to 3600.
   */
  getPresignedUrl(key: string, expiresIn?: number): Promise<string>;

  /**
   * Issues a temporary presigned URL for uploading an object to the given key.
   * The caller must supply the exact Content-Type that will be used when uploading.
   * @param key         Object key
   * @param contentType MIME type of the object to be uploaded
   * @param expiresIn   Expiry duration in seconds. Defaults to 3600.
   */
  getPresignedUploadUrl(
    key: string,
    contentType: string,
    expiresIn?: number,
  ): Promise<string>;

  /**
   * Returns metadata (content type and byte size) for the given object.
   * Returns null if the object does not exist or an error occurs.
   * @param key Object key
   */
  getObjectMetadata(
    key: string,
  ): Promise<{ contentType: string; size: number } | null>;

  /**
   * Writes an object to the bucket.
   * @param key         Object key
   * @param body        Data to upload
   * @param contentType MIME type (optional)
   */
  putObject(
    key: string,
    body: Buffer | Uint8Array,
    contentType?: string,
  ): Promise<void>;

  /**
   * Returns the Content-Type of the given object.
   * Returns undefined if the object does not exist.
   * @param key Object key
   */
  getContentType(key: string): Promise<string | undefined>;

  /**
   * Retrieves an object from the bucket as a Buffer.
   * Returns null if the object does not exist or an error occurs.
   * @param key Object key
   */
  getObject(key: string): Promise<Buffer | null>;

  /**
   * Deletes the given object from the bucket.
   * @param key Object key
   */
  deleteObject(key: string): Promise<void>;

  /**
   * Returns a list of object keys, optionally filtered by prefix.
   * @param prefix Key prefix (optional)
   */
  listObjects(prefix?: string): Promise<string[]>;
}
