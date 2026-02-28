import { Injectable, OnModuleInit } from '@nestjs/common';
import * as admin from 'firebase-admin';
import { getFirestore } from 'firebase-admin/firestore';
import { ConfigService } from '../config/config.service.js';

@Injectable()
export class FirebaseAdminProvider implements OnModuleInit {
	private _firestore: admin.firestore.Firestore;

	constructor(private readonly configService: ConfigService) {}

	onModuleInit() {
		const env = this.configService.getAll();

		if (!admin.apps.length && env.FIREBASE_PROJECT_ID) {
			admin.initializeApp({
				credential: admin.credential.cert({
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
