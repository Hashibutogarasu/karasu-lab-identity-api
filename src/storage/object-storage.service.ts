import {
  DeleteObjectCommand,
  GetObjectCommand,
  HeadObjectCommand,
  ListObjectsV2Command,
  PutObjectCommand,
  S3Client,
} from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import type { PutObjectCommandInput } from "@aws-sdk/client-s3";
import { Inject, Injectable } from "@nestjs/common";

import { STORAGE_OPTIONS } from "./storage.constants.js";
import type { StorageOptions } from "./storage-options.interface.js";
import type { IObjectStorage } from "./object-storage.interface.js";

@Injectable()
export class ObjectStorageService implements IObjectStorage {
  private readonly client: S3Client;
  private readonly bucket: string;
  private readonly publicUrl?: string;

  constructor(@Inject(STORAGE_OPTIONS) private readonly options: StorageOptions) {
    this.bucket = options.bucket;
    this.publicUrl = options.publicUrl;
    this.client = new S3Client({
      region: "auto",
      endpoint: options.endpoint,
      credentials: {
        accessKeyId: options.accessKeyId,
        secretAccessKey: options.secretAccessKey,
      },
    });
  }

  /**
   * Returns the public URL for the given object key.
   * Falls back to a presigned URL if no public domain is configured.
   */
  async getPublicUrl(key: string): Promise<string> {
    if (this.publicUrl) {
      return `${this.publicUrl}/${key}`;
    }
    return this.getPresignedUrl(key);
  }

  /**
   * Issues a temporary presigned URL for the given object key.
   * @param key       Object key
   * @param expiresIn Expiry duration in seconds. Defaults to 3600.
   */
  async getPresignedUrl(key: string, expiresIn = 3600): Promise<string> {
    const command = new GetObjectCommand({ Bucket: this.bucket, Key: key });
    return getSignedUrl(this.client, command, { expiresIn });
  }

  /**
   * Issues a temporary presigned URL for uploading.
   * @param key         Object key
   * @param contentType MIME type
   * @param expiresIn   Expiry duration in seconds. Defaults to 3600.
   */
  async getPresignedUploadUrl(
    key: string,
    contentType: string,
    expiresIn = 3600,
  ): Promise<string> {
    const input: PutObjectCommandInput = {
      Bucket: this.bucket,
      Key: key,
      ContentType: contentType,
    };
    const command = new PutObjectCommand(input);
    return getSignedUrl(this.client, command, { expiresIn });
  }

  /**
   * Returns the metadata of the given object key.
   * Returns null if the object does not exist.
   */
  async getObjectMetadata(
    key: string,
  ): Promise<{ contentType: string; size: number } | null> {
    try {
      const res = await this.client.send(
        new HeadObjectCommand({ Bucket: this.bucket, Key: key }),
      );
      if (!res.ContentType || res.ContentLength === undefined) return null;
      return { contentType: res.ContentType, size: res.ContentLength };
    } catch {
      return null;
    }
  }

  /**
   * Uploads an object.
   */
  async putObject(
    key: string,
    body: Buffer | Uint8Array,
    contentType?: string,
  ): Promise<void> {
    await this.client.send(
      new PutObjectCommand({
        Bucket: this.bucket,
        Key: key,
        Body: body,
        ContentType: contentType,
      }),
    );
  }

  /**
   * Returns the content type of the given object key.
   */
  async getContentType(key: string): Promise<string | undefined> {
    try {
      const res = await this.client.send(
        new HeadObjectCommand({ Bucket: this.bucket, Key: key }),
      );
      return res.ContentType;
    } catch {
      return undefined;
    }
  }

  /**
   * Downloads an object.
   */
  async getObject(key: string): Promise<Buffer | null> {
    try {
      const resp = await this.client.send(
        new GetObjectCommand({ Bucket: this.bucket, Key: key }),
      );
      if (!resp.Body) return null;
      const chunks: Buffer[] = [];
      for await (const chunk of resp.Body as AsyncIterable<Buffer>) {
        chunks.push(Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk));
      }
      return Buffer.concat(chunks);
    } catch {
      return null;
    }
  }

  /**
   * Deletes an object.
   */
  async deleteObject(key: string): Promise<void> {
    await this.client.send(
      new DeleteObjectCommand({ Bucket: this.bucket, Key: key }),
    );
  }

  /**
   * Lists object keys with the given prefix.
   */
  async listObjects(prefix?: string): Promise<string[]> {
    const res = await this.client.send(
      new ListObjectsV2Command({ Bucket: this.bucket, Prefix: prefix }),
    );
    return (res.Contents ?? []).map((obj) => obj.Key).filter(Boolean);
  }
}
