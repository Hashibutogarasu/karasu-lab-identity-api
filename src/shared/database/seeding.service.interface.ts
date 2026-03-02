export interface IDatabaseSeedingService {
	seed(): Promise<void>;
}

export const DatabaseSeedingConstants = {
	DUMMY_USER_ID: "dev-user-id",
	DUMMY_EMAIL: "dev@karasu256.com",
	DUMMY_PASSWORD: "password1234",
} as const;
