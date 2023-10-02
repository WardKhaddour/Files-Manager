const { BAD_REQUEST, UNAUTHORIZED } = require('http-status-codes').StatusCodes;
const AppError = require('../../../utils/AppError');
const UserAuthHelper = require('./UserAuthHelper');

class PasswordService extends UserAuthHelper {
  constructor(userDAO, emailHelper) {
    super();
    this.userDAO = userDAO;
    this.emailHelper = emailHelper;
  }

  async forgotPassword({ email }) {
    const existingUser = await this.userDAO.findByEmail(email);
    if (!existingUser) {
      return;
    }
    await this.emailHelper.sendPasswordResetLink(
      existingUser,
      `${process.env.FRONT_END_LINK}/${process.env.RESET_PASSWORD_PATH}`
    );
  }

  async resetPassword({ token, password }) {
    const existingUser = await this.userDAO.findByResetPasswordToken(token);
    if (!existingUser) {
      throw new AppError('Invalid or Expired Token', BAD_REQUEST);
    }
    const [, updatedUser] = await Promise.all([
      this.userDAO.clearResetToken(existingUser),
      this.userDAO.updateEntity(existingUser.id, {
        password,
        passwordChangedAt: Date.now(),
      }),
    ]);

    const bearerToken = this.signToken(updatedUser.id);
    return this.filterUserFields({ ...updatedUser, token: bearerToken });
  }

  async updatePassword({ userId, currentPassword, newPassword }) {
    const existingUser = await this.userDAO.findById(userId);

    if (!existingUser) {
      throw new AppError('No User Found!', BAD_REQUEST);
    }

    const isCorrectPassword = await this.userDAO.isCorrectPassword(
      existingUser,
      currentPassword
    );
    if (!isCorrectPassword) {
      throw new AppError('Current Password is Invalid', UNAUTHORIZED);
    }

    const updatedUser = await this.userDAO.updateEntity(existingUser.id, {
      password: newPassword,
      passwordChangedAt: Date.now(),
    });

    const token = this.signToken(updatedUser.id);
    return this.filterUserFields({ ...updatedUser, token });
  }
}

module.exports = PasswordService;
