const { UNAUTHORIZED, NOT_FOUND } = require('http-status-codes').StatusCodes;
const AppError = require('../../../utils/AppError');
const UserAuthHelper = require('./UserAuthHelper');

class UserService extends UserAuthHelper {
  constructor(userDAO, emailHelper) {
    super();
    this.userDAO = userDAO;
    this.emailHelper = emailHelper;
  }

  async getAllUsers() {
    return (await this.userDAO.findAll()).map(user =>
      this.filterUserFields(user)
    );
  }

  async getUser(userId) {
    return this.filterUserFields(await this.userDAO.findById(userId));
  }

  async searchForUsers({ search, role }) {
    const options = [];
    if (search) {
      options.push({
        searchStr: search,
        searchKeys: ['name', 'email'],
        insensitiveCase: true,
      });
    }
    if (role) {
      options.push({
        searchStr: role,
        searchKeys: ['role'],
        insensitiveCase: true,
      });
    }
    return this.userDAO.searchAll(options);
  }

  async updateMe({
    userId,
    email,
    name,
    photoSrc,
    university,
    faculty,
    year,
    section,
  }) {
    const isNewEmail =
      email && !(await this.userDAO.compareEmails(userId, email));
    if (isNewEmail) {
      await this.emailHelper.sendEmailConfirmationLink({
        id: userId,
        email,
      });
    }
    const updatedUser = await this.userDAO.updateEntity(userId, {
      email,
      name,
      photoSrc,
      university,
      faculty,
      year,
      section,
    });
    return updatedUser;
  }

  async deleteMe({ userId, password }) {
    const isCorrectPassword = await this.userDAO.isCorrectPassword(
      { id: userId },
      password
    );
    if (!isCorrectPassword) {
      throw new AppError('Incorrect Password, Please Try Again!', UNAUTHORIZED);
    }
    await this.userDAO.deactivateUser(userId);
  }

  async getUserPhotoSrc(userId) {
    return this.userDAO.getUserPhotoSrc(userId);
  }

  async getSavedFiles(userId) {
    return this.userDAO.getSavedFiles(userId);
  }

  async toggleSaveFile({ userId, fileId }) {
    const user = await this.userDAO.findById(userId);
    if (!user) {
      throw new AppError('User Not Found', NOT_FOUND);
    }
    const savedFiles = [...user.saved];
    const index = savedFiles.indexOf(fileId);
    if (index !== -1) {
      savedFiles.splice(index, 1);
    } else {
      savedFiles.push(fileId);
    }
    return this.userDAO.updateEntity(userId, {
      saved: savedFiles,
    });
  }

  async getCloudStats(userId) {
    return this.userDAO.getCloudStats(userId);
  }

  async deleteUserPhoto(userId) {
    await this.userDAO.updateEntity(userId, {
      photoSrc: 'default-user-photo.png',
    });
  }

  async deleteUser(userId) {
    const deletedUser = await this.userDAO.deleteEntity(userId);
    return deletedUser;
  }
}

module.exports = UserService;
