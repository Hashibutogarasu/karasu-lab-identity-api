import { OnModuleInit } from '@nestjs/common';
import { Firestore } from 'firebase-admin/firestore';
import { AbstractEnvironment } from '@hashibutogarasu/common';

/**
 * Interface for Firebase Admin Provider
 * Use IFirebaseAdminProvider as injection token in NestJS
 */
export abstract class IFirebaseAdminProvider extends AbstractEnvironment implements OnModuleInit {
	public static readonly DUMMY_PROJECT_ID = 'demo-no-project';

	abstract onModuleInit(): void | Promise<void>;
	abstract get db(): Firestore;
}
