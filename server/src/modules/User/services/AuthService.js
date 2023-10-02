const { CONFLICT, UNAUTHORIZED, BAD_REQUEST, NOT_FOUND } =
  require('http-status-codes').StatusCodes;
const AppError = require('../../../utils/AppError');
const UserAuthHelper = require('./UserAuthHelper');

class AuthService extends UserAuthHelper {
  constructor(userDAO, emailHelper) {
    super();
    this.userDAO = userDAO;
    this.emailHelper = emailHelper;
  }

  async signup({ name, email, password, year, section, faculty, university }) {
    const existingUser = await this.userDAO.findByEmail(email);

    if (existingUser && existingUser.active) {
      throw new AppError('Email already in use', CONFLICT);
    }

    const user = await this.userDAO.createEntity({
      name,
      email,
      password,
      year,
      section,
      faculty,
      university,
    });

    await this.emailHelper.sendEmailConfirmationLink(
      user,
      `${process.env.FRONT_END_LINK}/${process.env.CONFIRM_EMAIL_PATH}`
    );

    const token = this.signToken(user.id);
    return this.filterUserFields({ ...user, token });
  }

  async login({ email, password }) {
    const existingUser = await this.userDAO.findByEmail(email, {
      withPassword: true,
    });
    if (!existingUser) {
      throw new AppError('Invalid Credentials', UNAUTHORIZED);
    }

    const isCorrectPassword = await this.userDAO.isCorrectPassword(
      existingUser,
      password
    );

    if (!isCorrectPassword) {
      throw new AppError('Invalid Credentials', UNAUTHORIZED);
    }
    const token = this.signToken(existingUser.id);
    return this.filterUserFields({ ...existingUser, token });
  }

  async confirmEmail({ confirmEmailToken }) {
    const existingUser = await this.userDAO.findByConfirmEmailToken(
      confirmEmailToken
    );

    if (!existingUser) {
      throw new AppError('Invalid or Expired Token', BAD_REQUEST);
    }
    const [, user] = await Promise.all([
      this.userDAO.clearConfirmToken(existingUser),
      this.userDAO.updateEntity(existingUser.id, { emailIsConfirmed: true }),
    ]);

    const bearerToken = this.signToken(user.id);
    return this.filterUserFields({ ...user, token: bearerToken });
  }

  async resendConfirmToken({ email }) {
    const existingUser = await this.userDAO.findByEmail(email);

    if (!existingUser) {
      throw new AppError('No Account With This Email', NOT_FOUND);
    }
    await this.emailHelper.sendEmailConfirmationLink(
      existingUser,
      `${process.env.FRONT_END_LINK}/${process.env.CONFIRM_EMAIL_PATH}`
    );
  }
}

module.exports = AuthService;
