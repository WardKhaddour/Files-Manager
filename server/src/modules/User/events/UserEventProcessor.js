const { EventEmitter } = require('events');

class UserEventProcessor extends EventEmitter {
  constructor(userDAO) {
    super();
    this.userDAO = userDAO;

    this.on('check-user-exists', this.checkUserExists.bind(this));

    this.on(
      'check-changed-password-after',
      this.checkChangedPasswordAfter.bind(this)
    );

    this.on('get-user-roles', this.getUserRoles.bind(this));

    this.on('can-upload-file', this.canUploadFile.bind(this));

    this.on('upload-file', this.uploadFile.bind(this));

    this.on('delete-file', this.deleteFile.bind(this));

    this.on('get-saved-files', this.getSavedFiles.bind(this));
  }

  async checkUserExists(userId) {
    try {
      const user = await this.userDAO.findById(userId);
      this.emit('check-user-exists-response', !!user);
    } catch (err) {
      this.emit('check-user-exists-error', err);
    } finally {
      this.cleanupEventListeners('check-user-exists');
    }
  }

  async checkChangedPasswordAfter(userId, date) {
    try {
      const isPasswordChanged = await this.userDAO.changedPasswordAfter(
        userId,
        date
      );
      this.emit('check-changed-password-after-response', isPasswordChanged);
    } catch (err) {
      this.emit('check-changed-password-after-error', err);
    } finally {
      this.cleanupEventListeners('check-changed-password-after');
    }
  }

  async getUserRoles(userId) {
    try {
      const user = await this.userDAO.findById(userId);
      this.emit('get-user-roles-response', user?.role);
    } catch (err) {
      this.emit('get-user-roles-error', err);
    } finally {
      this.cleanupEventListeners('get-user-roles');
    }
  }

  async canUploadFile(userId, fileSize) {
    try {
      const canUpload = await this.userDAO.canUploadFile(userId, fileSize);
      this.emit('can-upload-file-response', canUpload);
    } catch (err) {
      this.emit('can-upload-file-error', err);
    } finally {
      this.cleanupEventListeners('can-upload-file');
    }
  }

  async uploadFile(userId, fileSize) {
    try {
      await this.userDAO.uploadFile(userId, fileSize);
      this.emit('upload-file-response', true);
    } catch (err) {
      this.emit('upload-file-error', err);
    } finally {
      this.cleanupEventListeners('upload-file');
    }
  }

  async deleteFile(userId, fileSize) {
    try {
      await this.userDAO.deleteFile(userId, fileSize);
      this.emit('delete-file-response', true);
    } catch (err) {
      this.emit('delete-file-error', err);
    } finally {
      this.cleanupEventListeners('delete-file');
    }
  }

  async getSavedFiles(userId) {
    try {
      const savedFiles = await this.userDAO.getSavedFilesIDs(userId);
      this.emit('get-saved-files-response', savedFiles);
    } catch (err) {
      this.emit('get-saved-files-error', err);
    } finally {
      this.cleanupEventListeners('get-saved-files');
    }
  }

  cleanupEventListeners(event) {
    this.removeAllListeners(`${event}-response`);
    this.removeAllListeners(`${event}-error`);
  }
}

module.exports = UserEventProcessor;
