import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: parseInt(process.env.SMTP_PORT || '587'),
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

export async function sendMagicLink(
  email: string,
  token: string,
  redirectUrl?: string
) {
  const baseUrl = process.env.FRONTEND_URL || 'http://localhost:3002';
  const verifyUrl = `${baseUrl}/verify?token=${token}${redirectUrl ? `&redirect=${encodeURIComponent(redirectUrl)}` : ''}`;

  const mailOptions = {
    from: process.env.FROM_EMAIL || 'noreply@benloe.com',
    to: email,
    subject: 'Your login link for benloe.com',
    html: `
      <!DOCTYPE html>
      <html>
      <head>
          <meta charset="utf-8">
          <style>
              body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #333; }
              .container { max-width: 600px; margin: 0 auto; padding: 20px; }
              .header { text-align: center; margin-bottom: 30px; }
              .button { display: inline-block; padding: 12px 24px; background-color: #3b82f6; color: white; text-decoration: none; border-radius: 6px; font-weight: 500; }
              .footer { margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee; font-size: 14px; color: #666; }
          </style>
      </head>
      <body>
          <div class="container">
              <div class="header">
                  <h1>🔐 Login to benloe.com</h1>
              </div>
              
              <p>Hi there,</p>
              
              <p>Click the button below to securely log in to your benloe.com account:</p>
              
              <div style="text-align: center; margin: 30px 0;">
                  <a href="${verifyUrl}" class="button">Log in to benloe.com</a>
              </div>
              
              <p>Or copy and paste this link into your browser:</p>
              <p style="word-break: break-all; background-color: #f3f4f6; padding: 10px; border-radius: 4px; font-family: monospace;">${verifyUrl}</p>
              
              <div class="footer">
                  <p>This link will expire in 15 minutes for security.</p>
                  <p>If you didn't request this login, you can safely ignore this email.</p>
              </div>
          </div>
      </body>
      </html>
    `,
    text: `
      Login to benloe.com
      
      Hi there,
      
      Click this link to securely log in to your benloe.com account:
      ${verifyUrl}
      
      This link will expire in 15 minutes for security.
      If you didn't request this login, you can safely ignore this email.
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log(`Magic link sent to ${email}`);
    return true;
  } catch (error) {
    console.error('Error sending magic link:', error);
    throw new Error('Failed to send magic link');
  }
}
