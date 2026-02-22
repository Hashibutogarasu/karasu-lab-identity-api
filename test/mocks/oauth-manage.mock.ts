import { vi } from "vitest";
import { IOAuthManage, OAuthApplication } from "../../src/plugins/oauth/oauth.interface.js";

export class MockOAuthManage implements IOAuthManage {
	listAllApplications = vi.fn().mockResolvedValue([]);
	getApplicationById = vi.fn().mockResolvedValue({});
	getApplicationByClientId = vi.fn().mockResolvedValue({});
	updateApplicationDisabledStatus = vi.fn().mockResolvedValue({});
	updateApplicationDetails = vi.fn().mockResolvedValue({});
	regenerateApplicationSecret = vi.fn().mockResolvedValue({} as OAuthApplication);
	deleteApplication = vi.fn().mockResolvedValue({ success: true });
}
