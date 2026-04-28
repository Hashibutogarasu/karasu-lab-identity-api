import { Injectable } from '@nestjs/common';
import { IConfigService } from '../shared/config/config.service.interface.js';
import { Environment } from '@hashibutogarasu/common';

const ANDROID_PACKAGE_NAME = 'net.karasuniki.karasulab';

/** SHA-256 fingerprint (colon-separated hex) for the debug keystore. */
const DEBUG_SHA256_FINGERPRINT =
  '48:48:6D:66:3F:10:F8:56:F4:CF:DA:86:A9:4A:58:1B:7B:35:3D:B6:2F:9A:2C:19:1D:8A:A6:5D:ED:ED:54:77';

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

    if (this.configService.environment !== Environment.PRODUCTION) {
      fingerprints.push(DEBUG_SHA256_FINGERPRINT);
    }

    if (env.ANDROID_SHA256_FINGERPRINTS) {
      fingerprints.push(
        ...env.ANDROID_SHA256_FINGERPRINTS.split(',').map((fp) => fp.trim()),
      );
    }

    return [
      {
        relation: ['delegate_permission/common.handle_all_urls'],
        target: {
          namespace: 'android_app',
          package_name: ANDROID_PACKAGE_NAME,
          sha256_cert_fingerprints: [...new Set(fingerprints)],
        },
      },
    ];
  }
}
