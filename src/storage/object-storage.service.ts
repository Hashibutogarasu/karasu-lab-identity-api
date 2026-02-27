import {
  DeleteObjectCommand,
  GetObjectCommand,
  HeadObjectCommand,
  ListObjectsV2Command,
  PutObjectCommand,
  S3Client,
} from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
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

  async deleteObject(key: string): Promise<void> {
    await this.client.send(
      new DeleteObjectCommand({ Bucket: this.bucket, Key: key }),
    );
  }

  async listObjects(prefix?: string): Promise<string[]> {
    const res = await this.client.send(
      new ListObjectsV2Command({ Bucket: this.bucket, Prefix: prefix }),
    );
    return (res.Contents ?? []).map((obj) => obj.Key!).filter(Boolean);
  }
}
