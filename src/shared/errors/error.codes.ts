import { APIError } from "better-auth/api";
import i18next from "i18next";

export type ErrorStatus = 'BAD_REQUEST' | 'UNAUTHORIZED' | 'FORBIDDEN' | 'NOT_FOUND' | 'INTERNAL_SERVER_ERROR' | 'SERVICE_UNAVAILABLE';

export interface ErrorDefinition {
	key: string;
	status: ErrorStatus;
}

export const ErrorCodes = {
	AUTH: {
		UNAUTHORIZED: { key: 'auth.unauthorized', status: 'UNAUTHORIZED' },
		PASSWORD_NOT_SET: { key: 'auth.password_not_set', status: 'BAD_REQUEST' },
		PASSWORD_ALREADY_SET: { key: 'auth.password_already_set', status: 'BAD_REQUEST' },
	},
	OAUTH: {
		INVALID_CLIENT: { key: 'oauth.invalid_client', status: 'UNAUTHORIZED' },
		INVALID_GRANT: { key: 'oauth.invalid_grant', status: 'BAD_REQUEST' },
		APPLICATION_NOT_FOUND: { key: 'oauth.application_not_found', status: 'NOT_FOUND' },
	},
	SYSTEM: {
		RESEND_API_KEY_REQUIRED: { key: 'system.resend_api_key_required', status: 'INTERNAL_SERVER_ERROR' },
	},
} as const satisfies Record<string, Record<string, ErrorDefinition>>;

export const createAPIError = (error: ErrorDefinition, options?: Record<string, unknown>): APIError => {
	return new APIError(error.status as ConstructorParameters<typeof APIError>[0], {
		message: i18next.t(error.key, options),
	});
};
