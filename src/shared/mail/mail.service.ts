import { IEmailFormat, IMailService } from "./mail.service.interface.js";
import { ResendMailService } from "./resend-mail.service.js";
import { ConsoleMailService } from "./console-mail.service.js";
import { AbstractPluginEnvironment } from "../plugin/abstract-plugin-environment.js";
import { Environment } from "@hashibutogarasu/common";

abstract class BaseMailServiceEnvironment extends AbstractPluginEnvironment<IMailService> {
	protected defaultFrom: string;

	constructor(protected apiKey: string, emailFormat: IEmailFormat) {
		super();
		this.defaultFrom = `${emailFormat.name} <${emailFormat.address}>`;
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

export const mailService = (apiKey: string, emailFormat: IEmailFormat): IMailService => {
	return AbstractPluginEnvironment.resolve({
		[Environment.PRODUCTION]: ProductionMailServiceEnvironment,
		[Environment.DEVELOPMENT]: DevelopmentMailServiceEnvironment,
		[Environment.TEST]: TestMailServiceEnvironment,
	}, apiKey, emailFormat);
};
