import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendEmail({
  from = `${process.env.EMAIL_FROM_NAME} <${process.env.EMAIL_FROM_ADDRESS}>`,
  to,
  subject,
  html,
}: {
  from?: string;
  to?: string | string[];
  subject?: string;
  html?: string;
} = {}) {
  await resend.emails.send({
    from,
    to,
    subject,
    html,
  });
}