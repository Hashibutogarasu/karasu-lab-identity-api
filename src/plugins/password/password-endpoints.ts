/* eslint-disable @typescript-eslint/no-unnecessary-type-assertion */
import { hashPassword, verifyPassword as verifyPasswordCrypto } from "better-auth/crypto";
import cuid from "cuid";
import { createAPIError, ErrorCodes } from "../../shared/errors/error.codes.js";
import { passwordPluginInterface } from "@hashibutogarasu/common";
import { AuthContext, EndpointContext, Session, User } from "better-auth";
import { AbstractEndpoint } from "../../shared/auth/abstract-endpoint.js";

type BetterAuthContext = AuthContext & {
    session?: {
        session: Session;
        user: User;
    } | null;
    internalAdapter: {
        findAccountByUserId: (userId: string) => Promise<any[]>;
        createAccount: (data: any) => Promise<any>;
    };
};

const interfacePlugin: ReturnType<typeof passwordPluginInterface> = passwordPluginInterface();

export class VerifyPasswordEndpoint extends AbstractEndpoint<
    typeof interfacePlugin.endpoints.verify.path,
    typeof interfacePlugin.endpoints.verify.options,
    boolean
> {
    constructor() {
        super();
    }

    readonly path = interfacePlugin.endpoints.verify.path;
    readonly options = interfacePlugin.endpoints.verify.options as typeof interfacePlugin.endpoints.verify.options;

    execute = async (ctx: EndpointContext<typeof this.path, typeof this.options> & { context: BetterAuthContext }): Promise<boolean> => {
        const context = ctx.context;
        const sessionData = context.session;
        const user = sessionData?.user;
        const session = sessionData?.session;

        const body = ctx.body as { password: string };
        const password = body.password;

        if (!session || !user) {
            throw createAPIError(ErrorCodes.AUTH.UNAUTHORIZED);
        }

        const accounts = await context.internalAdapter.findAccountByUserId(user.id);
        const account = accounts[0];

        if (!account || !account.password) {
            throw createAPIError(ErrorCodes.AUTH.PASSWORD_NOT_SET);
        }

        const valid = await verifyPasswordCrypto({
            password,
            hash: account.password,
        });

        return valid;
    };
}

export class SetPasswordEndpoint extends AbstractEndpoint<
    typeof interfacePlugin.endpoints.set.path,
    typeof interfacePlugin.endpoints.set.options,
    { success: boolean }
> {
    constructor() {
        super();
    }

    readonly path = interfacePlugin.endpoints.set.path;
    readonly options = interfacePlugin.endpoints.set.options as typeof interfacePlugin.endpoints.set.options;

    execute = async (ctx: EndpointContext<typeof this.path, typeof this.options> & { context: BetterAuthContext }): Promise<{ success: boolean }> => {
        const context = ctx.context;
        const sessionData = context.session;
        const user = sessionData?.user;
        const session = sessionData?.session;

        const body = ctx.body as { newPassword: string };
        const newPassword = body.newPassword;

        if (!session || !user) {
            throw createAPIError(ErrorCodes.AUTH.UNAUTHORIZED);
        }

        const accounts = await context.internalAdapter.findAccountByUserId(user.id);
        const credentialAccounts = accounts.filter((account) => {
            return account.password === null && account.providerId === 'credential';
        });

        if (credentialAccounts.length === 0) {
            await context.internalAdapter.createAccount({
                providerId: 'credential',
                providerAccountId: user.id,
                userId: user.id,
                password: await hashPassword(newPassword),
                accountId: cuid(),
            });

            return {
                success: true,
            };
        } else {
            throw createAPIError(ErrorCodes.AUTH.PASSWORD_ALREADY_SET);
        }
    };
}
