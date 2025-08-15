const nodemailer = require("nodemailer");

module.exports = class Email {
  constructor(user, url) {
    this.to = user.email;
    this.user = user.username;
    this.url = url;
    this.from = {
      name: "Quizkraze",
      address: process.env.EMAIL_FROM,
    };
  }

  newTransport() {
    return nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.APP_PASSWORD,
      },
    });
  }

  async send(subject, html) {
    await this.newTransport().sendMail({
      from: this.from,
      to: this.to,
      subject,
      html, // HTML version
    });
  }

  sendPasswordReset() {
    const subject = "Your password reset token (valid for 10 minutes)";

    const html = `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
        <title>Password Reset</title>
      </head>
      <body style="margin:0; padding:0; font-family: Arial, sans-serif; background-color: #F9FAFB; color: #1F2937;">
        <table width="100%" border="0" cellspacing="0" cellpadding="0">
          <tr>
            <td align="center" style="padding: 20px;">
              <table width="100%" style="max-width: 600px; background-color: #ffffff; border-radius: 8px; overflow: hidden;">
                <tr>
                  <td style="padding: 20px; text-align: center;">
                    <h1 style="color: #2563EB; margin-bottom: 10px;">Quizkraze</h1>
                    <p style="font-size: 16px; color: #1F2937;">
                      Hi <strong>${this.user}</strong>,<br/><br/>
                      You recently requested to reset your password. Click the button below to set a new password. 
                      This link will expire in <strong>10 minutes</strong>.
                    </p>
                    <p style="text-align: center; margin: 30px 0;">
                      <a href="${this.url}" 
                        style="background-color: #2563EB; color: white; padding: 12px 20px; text-decoration: none; border-radius: 6px; font-weight: bold; display: inline-block;">
                        Reset My Password
                      </a>
                    </p>
                    <p style="font-size: 14px; color: #6B7280;">
                      If you didn’t request this, you can safely ignore this email.
                    </p>
                  </td>
                </tr>
                <tr>
                  <td style="background-color: #F9FAFB; text-align: center; padding: 15px; font-size: 12px; color: #9CA3AF;">
                    © ${new Date().getFullYear()} Quizkraze. All rights reserved.
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      </body>
      </html>
    `;

    this.send(subject, html);
  }
};
