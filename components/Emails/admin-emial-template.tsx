export const AdminEmailTemplate = ({
  firstName,
  email,
  subject,
  message,
}: {
  firstName: string;
  email: string;
  subject: string;
  message: string;
}) => {
  return `
      <div>
        <h1>New Website Request</h1>
        <p>You have received a new website request from ${firstName}.</p>
        
        <h2>Request Details:</h2>
        <ul>
          <li><strong>Name:</strong> ${firstName}</li>
          <li><strong>Email:</strong> ${email}</li>
          <li><strong>Subject:</strong> ${subject}</li>
          <li><strong>Message:</strong> ${message}</li>
        </ul>
        
        <p>Please review and respond to this request as soon as possible.</p>
      </div>
    `;
};
