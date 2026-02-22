 
 
import { BetterAuthPlugin } from "better-auth"
import { createAuthEndpoint } from "better-auth/api"
import { OAuth } from "./oauth/oauth.js";
import { oauthApplicationPluginInterface } from "@karasu-lab/common";

export const oauthApplicationPlugin = (oauth?: OAuth): BetterAuthPlugin => {
  if (!oauth) {
    oauth = new OAuth();
  }

  const interfacePlugin = oauthApplicationPluginInterface();

  return {
    id: "oauthApplications",
    endpoints: {
      all: createAuthEndpoint(interfacePlugin.endpoints.all.options, async (ctx) => oauth.manage.listAllApplications(ctx)),
      getApp: createAuthEndpoint(interfacePlugin.endpoints.getApp.options, async (ctx) => oauth.manage.getApplicationById(ctx)),
      byClientId: createAuthEndpoint(interfacePlugin.endpoints.byClientId.options, async (ctx) => oauth.manage.getApplicationByClientId(ctx)),
      updateDisabled: createAuthEndpoint(interfacePlugin.endpoints.updateDisabled.options, async (ctx) => oauth.manage.updateApplicationDisabledStatus(ctx)),
      update: createAuthEndpoint(interfacePlugin.endpoints.update.options, async (ctx) => oauth.manage.updateApplicationDetails(ctx)),
      regenerateSecret: createAuthEndpoint(interfacePlugin.endpoints.regenerateSecret.options, async (ctx) => oauth.manage.regenerateApplicationSecret(ctx)),
      delete: createAuthEndpoint(interfacePlugin.endpoints.delete.options, async (ctx) => oauth.manage.deleteApplication(ctx)),
    }
  } satisfies BetterAuthPlugin
}
