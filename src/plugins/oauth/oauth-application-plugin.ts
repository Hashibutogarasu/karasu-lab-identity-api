import { BetterAuthPlugin } from "better-auth";
import { Environment } from "../../types/environment.js";
import { AbstractPluginEnvironment } from "../../shared/plugin/abstract-plugin-environment.js";
import { OAuth } from "./oauth.js";
import { IOAuth } from "./oauth.interface.js";
import {
  DeleteApplicationEndpoint,
  GetApplicationByClientIdEndpoint,
  GetApplicationByIdEndpoint,
  ListAllApplicationsEndpoint,
  RegenerateApplicationSecretEndpoint,
  UpdateApplicationDetailsEndpoint,
  UpdateApplicationDisabledStatusEndpoint,
} from "./oauth-application-endpoints.js";

abstract class BaseOAuthApplicationPluginEnvironment extends AbstractPluginEnvironment {
  constructor(protected oauth: IOAuth) {
    super();
  }

  resolve(): BetterAuthPlugin {
    return {
      id: "oauthApplications",
      endpoints: {
        all: new ListAllApplicationsEndpoint(this.oauth).getEndpoint(),
        getApp: new GetApplicationByIdEndpoint(this.oauth).getEndpoint(),
        byClientId: new GetApplicationByClientIdEndpoint(this.oauth).getEndpoint(),
        updateDisabled: new UpdateApplicationDisabledStatusEndpoint(this.oauth).getEndpoint(),
        update: new UpdateApplicationDetailsEndpoint(this.oauth).getEndpoint(),
        regenerateSecret: new RegenerateApplicationSecretEndpoint(this.oauth).getEndpoint(),
        delete: new DeleteApplicationEndpoint(this.oauth).getEndpoint(),
      }
    } satisfies BetterAuthPlugin;
  }
}

class ProductionOAuthApplicationPluginEnvironment extends BaseOAuthApplicationPluginEnvironment {}
class DevelopmentOAuthApplicationPluginEnvironment extends BaseOAuthApplicationPluginEnvironment {}
class TestOAuthApplicationPluginEnvironment extends BaseOAuthApplicationPluginEnvironment {}

export const oauthApplicationPlugin = (oauth: IOAuth = new OAuth()): BetterAuthPlugin => {
  return AbstractPluginEnvironment.resolve({
    [Environment.PRODUCTION]: ProductionOAuthApplicationPluginEnvironment,
    [Environment.DEVELOPMENT]: DevelopmentOAuthApplicationPluginEnvironment,
    [Environment.TEST]: TestOAuthApplicationPluginEnvironment,
  }, oauth);
};
