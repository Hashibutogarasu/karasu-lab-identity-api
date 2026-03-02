/**
 * Interface for DotEnv initialization service
 */
export abstract class IDotEnvService {
	/**
	 * Initialize environment variables from .env files
	 */
	abstract init(): void;
}
