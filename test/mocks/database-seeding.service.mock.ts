import { IDatabaseSeedingService, DatabaseSeedingConstants } from "../../src/shared/database/seeding.service.interface.js";
import { Auth as BetterAuthType } from "better-auth";
import { hashPassword } from "better-auth/crypto";

/**
 * Mock implementation of IDatabaseSeedingService for testing
 */
export class MockDatabaseSeedingService implements IDatabaseSeedingService {
	constructor(private readonly auth: BetterAuthType) {}

	async seed(): Promise<void> {
		const ctx = await this.auth.$context;
		
		// Seed dummy user
		await ctx.adapter.create({
			model: "user",
			data: {
				id: DatabaseSeedingConstants.DUMMY_USER_ID,
				name: "Dev User",
				email: DatabaseSeedingConstants.DUMMY_EMAIL,
				emailVerified: true,
				createdAt: new Date(),
				updatedAt: new Date(),
			},
		});

		// Seed dummy account
		await ctx.adapter.create({
			model: "account",
			data: {
				id: "dev-account-id",
				accountId: DatabaseSeedingConstants.DUMMY_USER_ID,
				providerId: "credential",
				userId: DatabaseSeedingConstants.DUMMY_USER_ID,
				password: await hashPassword(DatabaseSeedingConstants.DUMMY_PASSWORD),
				updatedAt: new Date(),
			},
		});
	}
}
