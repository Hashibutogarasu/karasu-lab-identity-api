import { APIError } from "better-auth/api";
import i18next from "i18next";

export type ErrorStatus = 'BAD_REQUEST' | 'UNAUTHORIZED' | 'FORBIDDEN' | 'NOT_FOUND' | 'INTERNAL_SERVER_ERROR' | 'SERVICE_UNAVAILABLE';

export class ErrorDefinition extends Error {
	constructor(public readonly key: string, public readonly status: ErrorStatus) {
		super(key);
		this.name = 'ErrorDefinition';
	}
}

export const ErrorCodes = {
	AUTH: {
		UNAUTHORIZED: new ErrorDefinition('auth.unauthorized', 'UNAUTHORIZED'),
		PASSWORD_NOT_SET: new ErrorDefinition('auth.password_not_set', 'BAD_REQUEST'),
		PASSWORD_ALREADY_SET: new ErrorDefinition('auth.password_already_set', 'BAD_REQUEST'),
	},
	OAUTH: {
		INVALID_CLIENT: new ErrorDefinition('oauth.invalid_client', 'UNAUTHORIZED'),
		INVALID_GRANT: new ErrorDefinition('oauth.invalid_grant', 'BAD_REQUEST'),
		APPLICATION_NOT_FOUND: new ErrorDefinition('oauth.application_not_found', 'NOT_FOUND'),
	},
	SYSTEM: {
		RESEND_API_KEY_REQUIRED: new ErrorDefinition('system.resend_api_key_required', 'INTERNAL_SERVER_ERROR'),
		AUTH_INITIALIZATION_FAILED: new ErrorDefinition('system.auth_initialization_failed', 'INTERNAL_SERVER_ERROR'),
		OPENAPI_UNINITIALIZED: new ErrorDefinition('system.openapi_uninitialized', 'INTERNAL_SERVER_ERROR'),
	},
	BLOG: {
		NOT_FOUND: new ErrorDefinition('blog.not_found', 'NOT_FOUND'),
		ATTACHMENT_NOT_FOUND: new ErrorDefinition('blog.attachment_not_found', 'NOT_FOUND'),
		FORBIDDEN: new ErrorDefinition('blog.forbidden', 'FORBIDDEN'),
		LOCKED: new ErrorDefinition('blog.locked', 'FORBIDDEN'),
		ATTACHMENT_TOO_LARGE: new ErrorDefinition('blog.attachment_too_large', 'BAD_REQUEST'),
	},
} as const;

export const createAPIError = (error: ErrorDefinition, options?: Record<string, unknown>): APIError => {
	return new APIError(error.status as ConstructorParameters<typeof APIError>[0], {
		message: i18next.t(error.key, options),
	});
};
