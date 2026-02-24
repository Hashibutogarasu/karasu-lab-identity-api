import { IMailService } from "./mail.service.interface.js";
import { ResendMailService } from "./resend-mail.service.js";
import { ConsoleMailService } from "./console-mail.service.js";
import { Environment } from "../../types/environment.js";
import { AbstractPluginEnvironment } from "../plugin/abstract-plugin-environment.js";

abstract class BaseMailServiceEnvironment extends AbstractPluginEnvironment<IMailService> {
	constructor(protected apiKey: string, protected defaultFrom: string) {
		super();
	}
}

class ProductionMailServiceEnvironment extends BaseMailServiceEnvironment {
	resolve(): IMailService {
		return new ResendMailService(this.environment, this.apiKey, this.defaultFrom);
	}
}

class DevelopmentMailServiceEnvironment extends BaseMailServiceEnvironment {
	resolve(): IMailService {
		return new ConsoleMailService(this.environment);
	}
}

class TestMailServiceEnvironment extends BaseMailServiceEnvironment {
	resolve(): IMailService {
		return new ConsoleMailService(this.environment);
	}
}

export const mailService = (apiKey: string, defaultFrom: string): IMailService => {
	return AbstractPluginEnvironment.resolve({
		[Environment.PRODUCTION]: ProductionMailServiceEnvironment,
		[Environment.DEVELOPMENT]: DevelopmentMailServiceEnvironment,
		[Environment.TEST]: TestMailServiceEnvironment,
	}, apiKey, defaultFrom);
};
