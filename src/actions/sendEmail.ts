"use server";

import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendOrderEmail(
  subject: string,
  message: string,
  destinationEmail: string
) {
  const res = await resend.emails.send({
    from: "JunaMeals <no-reply@junameals.com>",
    to: destinationEmail,
    subject,
    html: `<p>${message}</p>`,
  });
}
