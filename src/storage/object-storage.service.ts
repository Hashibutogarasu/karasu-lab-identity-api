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
import { Injectable } from "@nestjs/common";

import { storageConfig } from "../config/storage.env.js";
import type { IObjectStorage } from "./object-storage.interface.js";

@Injectable()
export class ObjectStorageService implements IObjectStorage {
  private readonly client: S3Client;
  private readonly bucket: string;

  constructor() {
    this.bucket = storageConfig.R2_BUCKET;
    this.client = new S3Client({
      region: "auto",
      endpoint: storageConfig.R2_ENDPOINT,
      credentials: {
        accessKeyId: storageConfig.R2_ACCESS_KEY_ID,
        secretAccessKey: storageConfig.R2_SECRET_ACCESS_KEY,
      },
    });
  }

  async getPresignedUrl(key: string, expiresIn = 3600): Promise<string> {
    const command = new GetObjectCommand({ Bucket: this.bucket, Key: key });
    return getSignedUrl(this.client, command, { expiresIn });
  }

  /**
   * Issues a presigned URL that allows a client to PUT an object directly into
   * the bucket without going through the application server.
   * @param key         Object key
   * @param contentType MIME type that the client must use when uploading
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
   * Returns the content type and byte size of the stored object.
   * Returns null when the object does not exist or the HEAD request fails.
   * @param key Object key
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

  async deleteObject(key: string): Promise<void> {
    await this.client.send(
      new DeleteObjectCommand({ Bucket: this.bucket, Key: key }),
    );
  }

  async listObjects(prefix?: string): Promise<string[]> {
    const res = await this.client.send(
      new ListObjectsV2Command({ Bucket: this.bucket, Prefix: prefix }),
    );
    return (res.Contents ?? []).map((obj) => obj.Key).filter(Boolean);
  }
}
