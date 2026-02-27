/** Injection token for IObjectStorage */
export const IObjectStorageService = "IObjectStorageService";

/**
 * Interface for object storage operations targeting S3-compatible storage
 * such as Cloudflare R2.
 */
export interface IObjectStorage {
  /**
   * Issues a temporary presigned URL for the given object key.
   * @param key       Object key
   * @param expiresIn Expiry duration in seconds. Defaults to 3600.
   */
  getPresignedUrl(key: string, expiresIn?: number): Promise<string>;

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
