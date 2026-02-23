import { AuthContext, Session, User, EndpointContext, Endpoint } from "better-auth";

export type OAuthApplication = {
	id: string;
	name: string;
	clientId: string;
	clientSecret: string | null;
	redirectURLs: string;
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
  listAllApplications<Path extends string = string, Options extends Endpoint['options'] = Endpoint['options']>(ctx: OAuthContext<Path, Options>): Promise<Partial<OAuthApplication>[]>;
  getApplicationById<Path extends string = string, Options extends Endpoint['options'] = Endpoint['options']>(ctx: OAuthContext<Path, Options>): Promise<Partial<OAuthApplication>>;
  getApplicationByClientId<Path extends string = string, Options extends Endpoint['options'] = Endpoint['options']>(ctx: OAuthContext<Path, Options>): Promise<Partial<OAuthApplication>>;
  updateApplicationDisabledStatus<Path extends string = string, Options extends Endpoint['options'] = Endpoint['options']>(ctx: OAuthContext<Path, Options>): Promise<Partial<OAuthApplication>>;
  updateApplicationDetails<Path extends string = string, Options extends Endpoint['options'] = Endpoint['options']>(ctx: OAuthContext<Path, Options>): Promise<Partial<OAuthApplication>>;
  regenerateApplicationSecret<Path extends string = string, Options extends Endpoint['options'] = Endpoint['options']>(ctx: OAuthContext<Path, Options>): Promise<OAuthApplication>;
  deleteApplication<Path extends string = string, Options extends Endpoint['options'] = Endpoint['options']>(ctx: OAuthContext<Path, Options>): Promise<{ success: boolean }>;
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
