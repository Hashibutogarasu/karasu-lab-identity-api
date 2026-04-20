import { initializeApp, getApps, cert } from 'firebase-admin/app';
import { getFirestore, Firestore } from 'firebase-admin/firestore';
import { IConfigService } from '../config/config.service.interface.js';
import { IFirebaseAdminProvider } from './firebase-admin.provider.interface.js';
import { AbstractPluginEnvironment } from '../plugin/abstract-plugin-environment.js';
import { Environment } from '@hashibutogarasu/common';

/**
 * Abstract base class for Firebase Admin Provider
 */
export abstract class AbstractFirebaseAdminProvider extends IFirebaseAdminProvider {
  protected _firestore: Firestore;

  constructor(
    environment: string,
    protected readonly configService: IConfigService,
  ) {
    super(environment);
  }

  get db(): Firestore {
    return this._firestore;
  }

  /**
   * Resolve current instance
   */
  resolve(): IFirebaseAdminProvider {
    return this;
  }
}

/**
 * Production environment Firebase Admin Provider
 */
class ProductionFirebaseAdminProvider extends AbstractFirebaseAdminProvider {
  constructor(configService: IConfigService) {
    super(Environment.PRODUCTION, configService);
  }

  onModuleInit() {
    const env = this.configService.getAll();

    if (!getApps().length && env.FIREBASE_PROJECT_ID) {
      initializeApp({
        credential: cert({
          projectId: env.FIREBASE_PROJECT_ID,
          clientEmail: env.FIREBASE_CLIENT_EMAIL,
          privateKey: env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
        }),
      });
    }

    if (env.FIREBASE_PROJECT_ID) {
      this._firestore = getFirestore();
    }
  }
}

/**
 * Development environment Firebase Admin Provider
 */
class DevelopmentFirebaseAdminProvider extends AbstractFirebaseAdminProvider {
  constructor(configService: IConfigService) {
    super(Environment.DEVELOPMENT, configService);
  }

  onModuleInit() {
    const env = this.configService.getAll();

    if (!getApps().length && env.FIREBASE_PROJECT_ID) {
      initializeApp({
        credential: cert({
          projectId: env.FIREBASE_PROJECT_ID,
          clientEmail: env.FIREBASE_CLIENT_EMAIL,
          privateKey: env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
        }),
      });
    }

    if (env.FIREBASE_PROJECT_ID) {
      this._firestore = getFirestore();
    }
  }
}

/**
 * Test environment Firebase Admin Provider
 * Configures connection to Firestore Emulator
 */
class TestFirebaseAdminProvider extends AbstractFirebaseAdminProvider {
  constructor(configService: IConfigService) {
    super(Environment.TEST, configService);
  }

  onModuleInit() {
    const env = this.configService.getAll();

    // Set emulator host if not already set.
    // Port 8080 is default for Firestore emulator.
    if (!process.env.FIRESTORE_EMULATOR_HOST) {
      process.env.FIRESTORE_EMULATOR_HOST = '127.0.0.1:8080';
    }

    if (!getApps().length) {
      initializeApp({
        projectId:
          env.FIREBASE_PROJECT_ID || IFirebaseAdminProvider.DUMMY_PROJECT_ID,
      });
    }

    this._firestore = getFirestore();
  }
}

/**
 * Factory function to create Firebase Admin Provider based on environment
 * @param configService Configuration service instance
 * @returns Firebase Admin Provider instance for current environment
 */
export function firebaseAdminProviderFactory(
  configService: IConfigService,
): IFirebaseAdminProvider {
  return AbstractPluginEnvironment.resolve<
    IFirebaseAdminProvider,
    AbstractFirebaseAdminProvider,
    [IConfigService]
  >(
    {
      [Environment.PRODUCTION]: ProductionFirebaseAdminProvider as new (
        configService: IConfigService,
      ) => AbstractFirebaseAdminProvider,
      [Environment.DEVELOPMENT]: DevelopmentFirebaseAdminProvider as new (
        configService: IConfigService,
      ) => AbstractFirebaseAdminProvider,
      [Environment.TEST]: TestFirebaseAdminProvider as new (
        configService: IConfigService,
      ) => AbstractFirebaseAdminProvider,
    },
    configService,
  );
}

/**
 * NestJS Provider for IFirebaseAdminProvider
 */
export const FirebaseAdminServiceProvider = {
  provide: IFirebaseAdminProvider,
  useFactory: firebaseAdminProviderFactory,
  inject: [IConfigService],
};
