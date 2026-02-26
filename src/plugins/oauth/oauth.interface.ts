/* eslint-disable @typescript-eslint/no-empty-object-type */
import { AuthContext, Session, User, EndpointContext, Endpoint } from "better-auth";

export type OAuthApplication = {
	id: string;
	name: string;
	clientId: string;
	clientSecret: string | null;
	redirectUrls: string;
	type: string;
	disabled: boolean | null;
	userId: string | null;
	createdAt: Date;
	updatedAt: Date;
};

export type OAuthContext<
	Path extends string = string,
	Options extends Endpoint['options'] = Endpoint['options']
> = EndpointContext<Path, Options> & {
	context: AuthContext & {
		session?: {
			session: Session;
			user: User;
		} | null;
	};
};

export interface IOAuthManage {
  listAllApplications(ctx: OAuthContext): Promise<Partial<OAuthApplication>[]>;
  getApplicationById(ctx: OAuthContext): Promise<Partial<OAuthApplication>>;
  getApplicationByClientId(ctx: OAuthContext): Promise<Partial<OAuthApplication>>;
  updateApplicationDisabledStatus(ctx: OAuthContext): Promise<Partial<OAuthApplication>>;
  updateApplicationDetails(ctx: OAuthContext): Promise<Partial<OAuthApplication>>;
  regenerateApplicationSecret(ctx: OAuthContext): Promise<OAuthApplication>;
  deleteApplication(ctx: OAuthContext): Promise<{ success: boolean }>;
}

export interface IOAuthConsent {
}

export interface IOAuthAuth {
}

export interface IOAuth {
  manage: IOAuthManage;
  consent: IOAuthConsent;
  auth: IOAuthAuth;
}
