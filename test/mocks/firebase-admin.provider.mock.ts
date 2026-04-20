import { IFirebaseAdminProvider } from '../../src/shared/firebase/firebase-admin.provider.interface.js';
import { Environment } from '@hashibutogarasu/common';
import { getFirestore, Firestore } from 'firebase-admin/firestore';
import { initializeApp, getApps } from 'firebase-admin/app';

/**
 * Mock implementation of IFirebaseAdminProvider for testing
 * Configures connection to Firestore Emulator
 */
export class MockFirebaseAdminProvider extends IFirebaseAdminProvider {
  private _firestore: Firestore;

  constructor() {
    super(Environment.TEST);
  }

  onModuleInit() {
    // Port 8080 is default for Firestore emulator.
    if (!process.env.FIRESTORE_EMULATOR_HOST) {
      process.env.FIRESTORE_EMULATOR_HOST = '127.0.0.1:8080';
    }

    if (!getApps().length) {
      initializeApp({
        projectId: IFirebaseAdminProvider.DUMMY_PROJECT_ID,
      });
    }

    this._firestore = getFirestore();
  }

  get db(): Firestore {
    return this._firestore;
  }
}
