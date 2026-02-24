import { AbstractMailService } from "./abstract-mail.service.js";
import { SendEmailOptions } from "./mail.service.interface.js";

export class ConsoleMailService extends AbstractMailService {
	constructor(environment: string) {
		super(environment);
	}

	sendEmail(options: SendEmailOptions): Promise<void> {
		const recipients = Array.isArray(options.to) ? options.to.join(", ") : options.to;
		 
		console.log(`[MailService] Sending email to ${recipients}: ${options.subject}`);
		return Promise.resolve();
	}
}
