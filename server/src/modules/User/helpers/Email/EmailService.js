const { createTransport } = require('nodemailer');
const SMTPTransport = require('nodemailer/lib/smtp-transport');
const pug = require('pug');
const { htmlToText } = require('html-to-text');

class EmailService {
  newTransport() {
    return createTransport(
      new SMTPTransport({
        host: process.env.EMAIL_HOST,
        port: +process.env.EMAIL_PORT,

        auth: {
          user: process.env.EMAIL_USERNAME,
          pass: process.env.EMAIL_PASSWORD,
        },
      })
    );
  }

  async send(email, url, template, subject) {
    const html = this.renderTemplate(template, { url, subject });
    const mailOptions = {
      from: `<${process.env.EMAIL_FROM}>`,
      to: email,
      subject,
      html,
      text: htmlToText(html),
    };
    await this.newTransport().sendMail(mailOptions);
  }

  async sendPasswordReset(email, url) {
    await this.send(
      email,
      url,
      'passwordReset',
      'Your password reset url (valid for 10 minutes only)'
    );
  }

  async sendEmailConfirm(email, url) {
    await this.send(
      email,
      url,
      'confirmEmail',
      'Your email confirm url (valid for 10 minutes only)'
    );
  }

  renderTemplate(template, variables) {
    return pug.renderFile(
      `${__dirname}/../../../../views/email/${template}.pug`,
      variables
    );
  }
}

module.exports = EmailService;
