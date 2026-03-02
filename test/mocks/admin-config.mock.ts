import { IAdminConfig } from "../../src/services/auth/admin/admin-config.interface.js";

/**
 * Mock implementation of IAdminConfig for testing
 */
export class MockAdminConfig implements IAdminConfig {
	private adminUserIds: string[] = [];

	constructor(adminUserIds: string[] = []) {
		this.adminUserIds = adminUserIds;
	}

	getUserIds(): string[] {
		return this.adminUserIds;
	}

	parse(val: string): boolean {
		try {
			this.adminUserIds = JSON.parse(val);
			return true;
		} catch {
			return false;
		}
	}
}
