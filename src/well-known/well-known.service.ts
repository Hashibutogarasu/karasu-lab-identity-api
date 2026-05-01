/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { Injectable } from '@nestjs/common';
import { getApiConfig } from '../utils/config.util.js';
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
  getAssetLinks(): AssetLink[] {
    const { android } = getApiConfig();

    return [
      {
        relation: [
          'delegate_permission/common.handle_all_urls',
          'delegate_permission/common.get_login_creds',
        ],
        target: {
          namespace: 'android_app',
          package_name: android.packageName,
          sha256_cert_fingerprints: Array.from(
            new Set(android.sha256CertFingerprints),
          ),
        },
      },
    ];
  }
}
