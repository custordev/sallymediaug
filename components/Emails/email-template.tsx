export function EmailTemplate(firstName: string, subject: string) {
  const link = process.env.NEXT_PUBLIC_BASE_URL;
  const currentYear = new Date().getFullYear();
  return `
      <!DOCTYPE html>
      <html lang="en">
      <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Thank You For Contacting DesiHub</title>
          <style>
              body {
                  font-family: Arial, sans-serif;
                  line-height: 1.6;
                  margin: 0;
                  padding: 0;
                  background-color: #f0f4fa;
              }
              .container {
                  max-width: 600px;
                  margin: 20px auto;
                  background-color: #ffffff;
                  border-radius: 8px;
                  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
                  overflow: hidden;
              }
              .header {
                  background-color: #020c62;
                  color: #ffffff;
                  padding: 20px;
                  text-align: center;
              }
              .header h1 {
                  margin: 0;
                  font-size: 24px;
              }
              .content {
                  padding: 20px;
                  color: #333333;
                  font-size: 16px;
              }
              .footer {
                  background-color: #f4f4f4;
                  padding: 15px;
                  text-align: center;
                  color: #666666;
                  font-size: 14px;
              }
              .footer p {
                  margin: 5px 0;
              }
              .button {
                  background-color: #020c62;
                  color: #ffffff;
                  padding: 10px 20px;
                  text-decoration: none;
                  display: inline-block;
                  border-radius: 5px;
                  margin-top: 10px;
              }
              a {
                  color: #0070f3;
                  text-decoration: none;
              }
              @media only screen and (max-width: 600px) {
                  .container {
                      width: 100% !important;
                  }
              }
          </style>
      </head>
      <body>
          <div class="container">
              <div class="header">
                  <h1>Thank You for Your Request</h1>
              </div>
              <div class="content">
                  <p>Dear ${firstName},</p>
                  <p>Thank you for reaching out to DesiHub! We're excited to assist you with your ${subject} We and appreciate the opportunity to work together.</p>
                  <p>Our team will review your request and get back to you with the next steps shortly.</p>
                  <p>If you have any questions or need further details in the meantime, feel free to reach out.</p>
                  <p>Looking forward to working with you!</p>
              </div>
              <div class="footer">
                  <p>DesisHub Team</p>
                  <p>&copy; ${currentYear} DesiHub. All rights reserved.</p>
                  <p><a href="${link}">Visit our site</a></p>
              </div>
          </div>
      </body>
      </html>
    `;
}
