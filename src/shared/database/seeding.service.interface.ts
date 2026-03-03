import { UserRoleType } from "@hashibutogarasu/common";

export interface IDatabaseSeedingService {
	seed(): Promise<void>;
}

export interface SeedUser {
	id?: string;
	name: string;
	email: string;
	password: string;
	role?: UserRoleType;
}

export const DatabaseSeedingConstants = {
	DUMMY_USER_NAME: 'Dev User',
	DUMMY_USER_ID: "dev-user-id",
	DUMMY_EMAIL: "dev@karasu256.com",
	DUMMY_PASSWORD: "password1234",
} as const;
