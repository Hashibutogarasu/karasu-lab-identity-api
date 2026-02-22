import { IOAuth, IOAuthAuth, IOAuthConsent, IOAuthManage } from "./oauth.interface.js";
import { OAuthManage } from "./oauth.manage.js";
import { OAuthConsent } from "./oauth.consent.js";

export class OAuth implements IOAuth {
  private readonly _manage: IOAuthManage;
  private readonly _consent: IOAuthConsent;
  private readonly _auth: IOAuthAuth;

  constructor() {
    this._manage = new OAuthManage();
    this._consent = new OAuthConsent();
    this._auth = {} as IOAuthAuth;
  }

  get manage(): IOAuthManage {
    return this._manage;
  }

  get consent(): IOAuthConsent {
    return this._consent;
  }

  get auth(): IOAuthAuth {
    return this._auth;
  }
}
