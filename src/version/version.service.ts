import { Injectable } from '@nestjs/common';
import { packageVersion } from '../version.js';

@Injectable()
export class VersionService {
  getVersion(): string {
    return packageVersion;
  }
}
