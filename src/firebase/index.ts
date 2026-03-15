import { getAuth } from 'firebase-admin/auth';
import { ErrorCodes } from '../shared/errors/error.codes.js';

export interface SyncUser {
	id: string;
	email: string;
	name: string;
}

/**
 * Syncs a better-auth user to Firebase.
 * Creates a Firebase user with the same mapping UID if it doesn't exist.
 */
export async function syncFirebaseUser(user: SyncUser) {
	const auth = getAuth();
	try {
		await auth.getUser(user.id);
	} catch (error: unknown) {
		if ((error as { code?: string }).code === 'auth/user-not-found') {
			try {
				await auth.createUser({
					uid: user.id,
					email: user.email,
					displayName: user.name,
				});
				return;
			} catch {
				throw ErrorCodes.FIREBASE.SYNC_FAILED;
			}
		}
		throw ErrorCodes.FIREBASE.SYNC_FAILED;
	}
}

/**
 * Creates a Firebase Custom Token for the given UID.
 * This token is used on the client-side to sign in to Firebase.
 */
export async function createFirebaseCustomToken(uid: string): Promise<string> {
	try {
		const auth = getAuth();
		return await auth.createCustomToken(uid);
	} catch {
		throw ErrorCodes.FIREBASE.SYNC_FAILED;
	}
}
