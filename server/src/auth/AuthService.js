const { UNAUTHORIZED } = require('http-status-codes').StatusCodes;

const AppError = require('../utils/AppError');
const { verifyToken } = require('../utils/jwt');

class AuthService {
  constructor(eventBus) {
    this.eventBus = eventBus;
  }

  async verifyToken(token, secret) {
    const decodedToken = await verifyToken(token, secret);
    const { userId } = decodedToken;
    const isUserExists = await this.eventBus.emitUserEvent(
      'check-user-exists',
      userId
    );

    if (!isUserExists) {
      throw new AppError('Account is deleted', UNAUTHORIZED);
    }
    return decodedToken;
  }

  async changedPasswordAfter(userId, date) {
    const isPasswordChanged = await this.eventBus.emitUserEvent(
      'check-changed-password-after',
      userId,
      date
    );
    return isPasswordChanged;
  }

  async getUserRole(userId) {
    const roles = await this.eventBus.emitUserEvent('get-user-roles', userId);
    return roles;
  }
}

module.exports = AuthService;
