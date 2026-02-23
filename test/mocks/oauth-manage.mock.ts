import { vi } from "vitest";
import { IOAuthManage, OAuthApplication } from "../../src/plugins/oauth/oauth.interface.js";

export class MockOAuthManage implements IOAuthManage {
	listAllApplications: IOAuthManage['listAllApplications'] = vi.fn().mockResolvedValue([]);
	getApplicationById: IOAuthManage['getApplicationById'] = vi.fn().mockResolvedValue({});
	getApplicationByClientId: IOAuthManage['getApplicationByClientId'] = vi.fn().mockResolvedValue({});
	updateApplicationDisabledStatus: IOAuthManage['updateApplicationDisabledStatus'] = vi.fn().mockResolvedValue({});
	updateApplicationDetails: IOAuthManage['updateApplicationDetails'] = vi.fn().mockResolvedValue({});
	regenerateApplicationSecret: IOAuthManage['regenerateApplicationSecret'] = vi.fn().mockResolvedValue({} as OAuthApplication);
	deleteApplication: IOAuthManage['deleteApplication'] = vi.fn().mockResolvedValue({ success: true });
}
