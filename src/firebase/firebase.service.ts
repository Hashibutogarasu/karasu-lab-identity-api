import { Injectable } from '@nestjs/common';
import { getAuth } from 'firebase-admin/auth';
import { ErrorCodes } from '../shared/errors/error.codes.js';

@Injectable()
export class FirebaseService {
  /**
   * Creates a Firebase Custom Token for the given UID.
   * This token is used on the client-side to sign in to Firebase.
   */
  async createCustomToken(uid: string): Promise<string> {
    try {
      const auth = getAuth();
      return await auth.createCustomToken(uid);
    } catch {
      throw ErrorCodes.FIREBASE.SYNC_FAILED;
    }
  }
}
