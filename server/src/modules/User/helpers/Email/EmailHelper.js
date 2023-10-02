const { StatusCodes, ReasonPhrases } = require('http-status-codes');
const AppError = require('../../../../utils/AppError');

class EmailHelper {
  constructor(emailService, userDAO) {
    this.emailService = emailService;
    this.userDAO = userDAO;
  }

  async sendEmailConfirmationLink(user, baseUrl) {
    const confirmToken = await this.userDAO.createEmailConfirmToken(user);

    try {
      await this.emailService.sendEmailConfirm(
        user.email,
        `${baseUrl}/${confirmToken}`
      );
    } catch (err) {
      await this.userDAO.clearConfirmToken(user);
      console.log(err);
      throw new AppError(
        ReasonPhrases.INTERNAL_SERVER_ERROR,
        StatusCodes.INTERNAL_SERVER_ERROR
      );
    }
  }

  async sendPasswordResetLink(user, baseUrl) {
    const resetToken = await this.userDAO.createPasswordResetToken(user);

    try {
      await this.emailService.sendPasswordReset(
        user.email,
        `${baseUrl}/${resetToken}`
      );
    } catch (err) {
      await this.userDAO.clearResetToken(user);

      console.log(err);
      throw new AppError(
        ReasonPhrases.INTERNAL_SERVER_ERROR,
        StatusCodes.INTERNAL_SERVER_ERROR
      );
    }
  }
}

module.exports = EmailHelper;
