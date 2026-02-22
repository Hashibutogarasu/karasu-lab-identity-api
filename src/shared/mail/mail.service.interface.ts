export interface SendEmailOptions {
  from?: string;
  to: string | string[];
  subject: string;
  html: string;
}

export interface IMailService {
  sendEmail(options: SendEmailOptions): Promise<void>;
}
