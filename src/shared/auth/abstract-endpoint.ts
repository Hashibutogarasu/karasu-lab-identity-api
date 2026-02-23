import { AuthContext, Endpoint, EndpointContext } from 'better-auth';
import { createAuthEndpoint, AuthEndpoint } from 'better-auth/api';

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
		const handler = this.execute.bind(this);
		return createAuthEndpoint(
			this.path,
			this.options,
			handler as never
		) as unknown as AuthEndpoint<Path, Options, Output>;
	}
}
