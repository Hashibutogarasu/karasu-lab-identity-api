import { IOAuth, IOAuthAuth, IOAuthConsent, IOAuthManage } from "../../src/plugins/oauth/oauth.interface.js";
import { MockOAuthManage } from "./oauth-manage.mock.js";

export class MockOAuth implements IOAuth {
	manage: IOAuthManage = new MockOAuthManage();
	consent: IOAuthConsent = {} as IOAuthConsent;
	auth: IOAuthAuth = {} as IOAuthAuth;
}
