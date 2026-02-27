import { AuthContext, Endpoint, EndpointContext } from 'better-auth';
import { createAuthEndpoint, AuthEndpoint } from 'better-auth/api';
import { createAPIError, ErrorDefinition } from '../errors/error.codes.js';

export abstract class AbstractEndpoint<
	Path extends string = string,
	Options extends Endpoint['options'] = Endpoint['options'],
	Output = unknown,
>
{
	abstract readonly path: Path;
	abstract readonly options: Options;
	abstract execute: (
		ctx: EndpointContext<Path, Options> & { context: AuthContext },
	) => Promise<Output>;

	getEndpoint(): AuthEndpoint<Path, Options, Output> {
		const handler = async (ctx: EndpointContext<Path, Options> & { context: AuthContext }) => {
			try {
				return await this.execute(ctx);
			} catch (error) {
				if (error instanceof ErrorDefinition) {
					throw createAPIError(error);
				}
				throw error;
			}
		};
		return createAuthEndpoint(
			this.path,
			this.options,
			handler as never
		) as unknown as AuthEndpoint<Path, Options, Output>;
	}
}
