import { APIError } from "better-auth/api";
import i18next from "i18next";

export type ErrorStatus = 'BAD_REQUEST' | 'UNAUTHORIZED' | 'FORBIDDEN' | 'NOT_FOUND' | 'INTERNAL_SERVER_ERROR' | 'SERVICE_UNAVAILABLE';

export class ErrorDefinition extends Error {
	constructor(public readonly key: string, public readonly status: ErrorStatus) {
		super(key);
		this.name = 'ErrorDefinition';
	}
}

function createErrorMap<T extends Record<string, Record<string, readonly [string, ErrorStatus]>>>(map: T): {
	[K in keyof T]: {
		[P in keyof T[K]]: ErrorDefinition;
	}
} {
	const result: Record<string, Record<string, ErrorDefinition>> = {};
	for (const category in map) {
		result[category] = {};
		for (const code in map[category]) {
			const [key, status] = map[category][code];
			result[category][code] = new ErrorDefinition(key, status);
		}
	}
	return result as unknown as {
		[K in keyof T]: {
			[P in keyof T[K]]: ErrorDefinition;
		}
	};
}

export const ErrorCodes = createErrorMap({
	AUTH: {
		UNAUTHORIZED: ['auth.unauthorized', 'UNAUTHORIZED'],
		PASSWORD_NOT_SET: ['auth.password_not_set', 'BAD_REQUEST'],
		PASSWORD_ALREADY_SET: ['auth.password_already_set', 'BAD_REQUEST'],
	},
	OAUTH: {
		INVALID_CLIENT: ['oauth.invalid_client', 'UNAUTHORIZED'],
		INVALID_GRANT: ['oauth.invalid_grant', 'BAD_REQUEST'],
		APPLICATION_NOT_FOUND: ['oauth.application_not_found', 'NOT_FOUND'],
	},
	SYSTEM: {
		RESEND_API_KEY_REQUIRED: ['system.resend_api_key_required', 'INTERNAL_SERVER_ERROR'],
		AUTH_INITIALIZATION_FAILED: ['system.auth_initialization_failed', 'INTERNAL_SERVER_ERROR'],
		OPENAPI_UNINITIALIZED: ['system.openapi_uninitialized', 'INTERNAL_SERVER_ERROR'],
		OPENAPI_UNAUTHORIZED: ['system.openapi_unauthorized', 'UNAUTHORIZED'],
	},
	BLOG: {
		NOT_FOUND: ['blog.not_found', 'NOT_FOUND'],
		ATTACHMENT_NOT_FOUND: ['blog.attachment_not_found', 'NOT_FOUND'],
		FORBIDDEN: ['blog.forbidden', 'FORBIDDEN'],
		LOCKED: ['blog.locked', 'FORBIDDEN'],
		ATTACHMENT_TOO_LARGE: ['blog.attachment_too_large', 'BAD_REQUEST'],
	},
} as const);

export const createAPIError = (error: ErrorDefinition, options?: Record<string, unknown>): APIError => {
	return new APIError(error.status as ConstructorParameters<typeof APIError>[0], {
		message: i18next.t(error.key, options),
	});
};
