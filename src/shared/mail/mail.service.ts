import { Resend } from "resend";
import { AbstractMailService } from "./abstract-mail.service.js";
import { SendEmailOptions } from "./mail.service.interface.js";

export class MailService extends AbstractMailService {
  private resend: Resend;
  private defaultFrom: string;

  constructor(environment: string, apiKey: string, defaultFrom: string) {
    super(environment);
    this.resend = new Resend(apiKey);
    this.defaultFrom = defaultFrom;
  }

  async sendEmail(options: SendEmailOptions): Promise<void> {
    await this.resend.emails.send({
      from: options.from || this.defaultFrom,
      to: options.to,
      subject: options.subject,
      html: options.html,
    });
  }
}
