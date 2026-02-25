 
/* eslint-disable @typescript-eslint/no-unnecessary-type-assertion */
import { AbstractEndpoint } from "../../shared/auth/abstract-endpoint.js";
import { oauthApplicationPluginInterface } from "@hashibutogarasu/common";
import { IOAuth } from "../oauth/oauth.interface.js";
import { AuthContext, EndpointContext } from "better-auth";

const interfacePlugin: ReturnType<typeof oauthApplicationPluginInterface> = oauthApplicationPluginInterface();

export class ListAllApplicationsEndpoint extends AbstractEndpoint<
    typeof interfacePlugin.endpoints.all.path,
    typeof interfacePlugin.endpoints.all.options
> {
    constructor(private readonly oauth: IOAuth) {
        super();
    }

    readonly path = interfacePlugin.endpoints.all.path;
    readonly options = interfacePlugin.endpoints.all.options as typeof interfacePlugin.endpoints.all.options;

    execute = async (ctx: EndpointContext<typeof this.path, typeof this.options> & { context: AuthContext }) =>
        await this.oauth.manage.listAllApplications(ctx);
}

export class GetApplicationByIdEndpoint extends AbstractEndpoint<
    typeof interfacePlugin.endpoints.getApp.path,
    typeof interfacePlugin.endpoints.getApp.options
> {
    constructor(private readonly oauth: IOAuth) {
        super();
    }

    readonly path = interfacePlugin.endpoints.getApp.path;
    readonly options = interfacePlugin.endpoints.getApp.options as typeof interfacePlugin.endpoints.getApp.options;

    execute = async (ctx: EndpointContext<typeof this.path, typeof this.options> & { context: AuthContext }) =>
        await this.oauth.manage.getApplicationById(ctx);
}

export class GetApplicationByClientIdEndpoint extends AbstractEndpoint<
    typeof interfacePlugin.endpoints.byClientId.path,
    typeof interfacePlugin.endpoints.byClientId.options
> {
    constructor(private readonly oauth: IOAuth) {
        super();
    }

    readonly path = interfacePlugin.endpoints.byClientId.path;
    readonly options = interfacePlugin.endpoints.byClientId.options as typeof interfacePlugin.endpoints.byClientId.options;

    execute = async (ctx: EndpointContext<typeof this.path, typeof this.options> & { context: AuthContext }) =>
        await this.oauth.manage.getApplicationByClientId(ctx);
}

export class UpdateApplicationDisabledStatusEndpoint extends AbstractEndpoint<
    typeof interfacePlugin.endpoints.updateDisabled.path,
    typeof interfacePlugin.endpoints.updateDisabled.options
> {
    constructor(private readonly oauth: IOAuth) {
        super();
    }

    readonly path = interfacePlugin.endpoints.updateDisabled.path;
    readonly options = interfacePlugin.endpoints.updateDisabled.options as typeof interfacePlugin.endpoints.updateDisabled.options;

    execute = async (ctx: EndpointContext<typeof this.path, typeof this.options> & { context: AuthContext }) =>
        await this.oauth.manage.updateApplicationDisabledStatus(ctx);
}

export class UpdateApplicationDetailsEndpoint extends AbstractEndpoint<
    typeof interfacePlugin.endpoints.update.path,
    typeof interfacePlugin.endpoints.update.options
> {
    constructor(private readonly oauth: IOAuth) {
        super();
    }

    readonly path = interfacePlugin.endpoints.update.path;
    readonly options = interfacePlugin.endpoints.update.options as typeof interfacePlugin.endpoints.update.options;

    execute = async (ctx: EndpointContext<typeof this.path, typeof this.options> & { context: AuthContext }) =>
        await this.oauth.manage.updateApplicationDetails(ctx);
}

export class RegenerateApplicationSecretEndpoint extends AbstractEndpoint<
    typeof interfacePlugin.endpoints.regenerateSecret.path,
    typeof interfacePlugin.endpoints.regenerateSecret.options
> {
    constructor(private readonly oauth: IOAuth) {
        super();
    }

    readonly path = interfacePlugin.endpoints.regenerateSecret.path;
    readonly options = interfacePlugin.endpoints.regenerateSecret.options as typeof interfacePlugin.endpoints.regenerateSecret.options;

    execute = async (ctx: EndpointContext<typeof this.path, typeof this.options> & { context: AuthContext }) =>
        await this.oauth.manage.regenerateApplicationSecret(ctx);
}

export class DeleteApplicationEndpoint extends AbstractEndpoint<
    typeof interfacePlugin.endpoints.delete.path,
    typeof interfacePlugin.endpoints.delete.options
> {
    constructor(private readonly oauth: IOAuth) {
        super();
    }

    readonly path = interfacePlugin.endpoints.delete.path;
    readonly options = interfacePlugin.endpoints.delete.options as typeof interfacePlugin.endpoints.delete.options;

    execute = async (ctx: EndpointContext<typeof this.path, typeof this.options> & { context: AuthContext }) =>
        await this.oauth.manage.deleteApplication(ctx);
}
