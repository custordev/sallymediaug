"use server";

import { AdminEmailTemplate } from "@/components/Emails/admin-emial-template";
import { EmailTemplate } from "@/components/Emails/email-template";

import { EmailTemplateProps } from "@/types/types";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

interface EmailResponse {
  success: boolean;
  data?: string;
  error?: string;
}

export async function sendEmail(
  data: EmailTemplateProps
): Promise<EmailResponse> {
  const { firstName, email, subject, message } = data;

  try {
    // Send thank you email to the sender
    const userEmailResult = await resend.emails.send({
      from: "Desishub <info@kyaja.com>",
      to: email, // Send to the person who submitted the form
      subject: `Thank you for your website request: ${subject}`,
      html: EmailTemplate(firstName, subject),
    });

    // Send notification email to admin
    const adminEmailResult = await resend.emails.send({
      from: "Desishub <info@kyaja.com>",
      to: "custor00@gmail.com", // Admin email
      subject: `New Website Request from ${firstName}: ${subject}`,
      html: AdminEmailTemplate({
        firstName,
        email,
        subject,
        message,
      }),
    });

    console.log("User email sent successfully:", userEmailResult);
    console.log("Admin email sent successfully:", adminEmailResult);

    return {
      success: true,
    };
  } catch (error) {
    console.error("Failed to send email:", error);
    return { success: false };
  }
}
