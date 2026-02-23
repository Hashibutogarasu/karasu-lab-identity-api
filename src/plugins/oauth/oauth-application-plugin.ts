import { BetterAuthPlugin } from "better-auth";
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

export const oauthApplicationPlugin = (oauth: IOAuth = new OAuth()): BetterAuthPlugin => {
  return {
    id: "oauthApplications",
    endpoints: {
      all: new ListAllApplicationsEndpoint(oauth).getEndpoint(),
      getApp: new GetApplicationByIdEndpoint(oauth).getEndpoint(),
      byClientId: new GetApplicationByClientIdEndpoint(oauth).getEndpoint(),
      updateDisabled: new UpdateApplicationDisabledStatusEndpoint(oauth).getEndpoint(),
      update: new UpdateApplicationDetailsEndpoint(oauth).getEndpoint(),
      regenerateSecret: new RegenerateApplicationSecretEndpoint(oauth).getEndpoint(),
      delete: new DeleteApplicationEndpoint(oauth).getEndpoint(),
    }
  } satisfies BetterAuthPlugin;
};
