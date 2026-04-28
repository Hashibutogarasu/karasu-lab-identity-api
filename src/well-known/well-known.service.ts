/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { Injectable } from '@nestjs/common';
import { IConfigService } from '../shared/config/config.service.interface.js';

const ANDROID_PACKAGE_NAME = 'net.karasuniki.karasulab';
interface AndroidTarget {
  namespace: 'android_app';
  package_name: string;
  sha256_cert_fingerprints: string[];
}

interface AssetLink {
  relation: string[];
  target: AndroidTarget;
}

/** Builds the Digital Asset Links document for Android passkey support. */
@Injectable()
export class WellKnownService {
  constructor(private readonly configService: IConfigService) {}

  getAssetLinks(): AssetLink[] {
    const env = this.configService.getAll();

    const fingerprints: string[] = [];

    if (env.ANDROID_SHA256_FINGERPRINTS) {
      fingerprints.push(
        ...env.ANDROID_SHA256_FINGERPRINTS.split(',').map((fp) => fp.trim()),
      );
    }

    return [
      {
        relation: [
          'delegate_permission/common.handle_all_urls',
          'delegate_permission/common.get_login_creds',
        ],
        target: {
          namespace: 'android_app',
          package_name: ANDROID_PACKAGE_NAME,
          sha256_cert_fingerprints: [...new Set(fingerprints)],
        },
      },
    ];
  }
}
