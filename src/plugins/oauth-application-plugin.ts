 
 
import { BetterAuthPlugin } from "better-auth"
import { createAuthEndpoint } from "better-auth/api"
import { OAuth } from "./oauth/oauth.js";
import { oauthApplicationPluginInterface } from "@karasu-lab/common";
import { IOAuth } from "./oauth/oauth.interface.js";

export const oauthApplicationPlugin = (oauth?: IOAuth): BetterAuthPlugin => {
  if (!oauth) {
    oauth = new OAuth();
  }

  const interfacePlugin = oauthApplicationPluginInterface();
  return {
    id: "oauthApplications",
    endpoints: {
      all: createAuthEndpoint(interfacePlugin.endpoints.all.path, interfacePlugin.endpoints.all.options, async (ctx: any) => oauth.manage.listAllApplications(ctx)),
      getApp: createAuthEndpoint(interfacePlugin.endpoints.getApp.path, interfacePlugin.endpoints.getApp.options, async (ctx: any) => oauth.manage.getApplicationById(ctx)),
      byClientId: createAuthEndpoint(interfacePlugin.endpoints.byClientId.path, interfacePlugin.endpoints.byClientId.options, async (ctx: any) => oauth.manage.getApplicationByClientId(ctx)),
      updateDisabled: createAuthEndpoint(interfacePlugin.endpoints.updateDisabled.path, interfacePlugin.endpoints.updateDisabled.options, async (ctx: any) => oauth.manage.updateApplicationDisabledStatus(ctx)),
      update: createAuthEndpoint(interfacePlugin.endpoints.update.path, interfacePlugin.endpoints.update.options, async (ctx: any) => oauth.manage.updateApplicationDetails(ctx)),
      regenerateSecret: createAuthEndpoint(interfacePlugin.endpoints.regenerateSecret.path, interfacePlugin.endpoints.regenerateSecret.options, async (ctx: any) => oauth.manage.regenerateApplicationSecret(ctx)),
      delete: createAuthEndpoint(interfacePlugin.endpoints.delete.path, interfacePlugin.endpoints.delete.options, async (ctx: any) => oauth.manage.deleteApplication(ctx)),
    }
  } satisfies BetterAuthPlugin
}
