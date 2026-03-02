import { Injectable, OnModuleInit } from '@nestjs/common';
import { initializeApp, getApps, cert } from 'firebase-admin/app';
import { getFirestore, Firestore } from 'firebase-admin/firestore';
import { IConfigService } from '../config/config.service.interface.js';

@Injectable()
export class FirebaseAdminProvider implements OnModuleInit {
	private _firestore: Firestore;

	constructor(private readonly configService: IConfigService) {}

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

	get db() {
		return this._firestore;
	}
}
