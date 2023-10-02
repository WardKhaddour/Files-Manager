const { NOT_FOUND, CONFLICT, UNAUTHORIZED, BAD_REQUEST } =
  require('http-status-codes').StatusCodes;

const AppError = require('../../../utils/AppError');

class CloudFileService {
  constructor(cloudFileDAO, eventBus) {
    this.cloudFileDAO = cloudFileDAO;
    this.eventBus = eventBus;
  }

  async getMyCloud(userId) {
    return this.cloudFileDAO.findAll({ author: userId });
  }

  async getFileById(fileId, userId) {
    const file = await this.cloudFileDAO.findById(fileId);
    if (userId !== file.author) {
      throw new AppError('Unauthorized', UNAUTHORIZED);
    }
    return file;
  }

  async createFile(fileData) {
    const { author, name, path, size } = fileData;

    const existingFileName = await this.cloudFileDAO.findOne({
      name,
      author,
    });

    if (existingFileName) {
      throw new AppError('File name already exists.', CONFLICT);
    }

    const canUploadFile = await this.eventBus.emitUserEvent(
      'can-upload-file',
      author,
      size
    );
    if (!canUploadFile) {
      throw new AppError(`You don't have enough space`, BAD_REQUEST);
    }

    const cloudFile = await this.cloudFileDAO.createEntity({
      author,
      name,
      path,
      size,
    });
    await this.eventBus.emitUserEvent('upload-file', author, size);
    return cloudFile;
  }

  async updateFile(fileData, userId) {
    const { fileId, name } = fileData;

    const fileToUpdate = await this.cloudFileDAO.findById(fileId);
    if (!fileToUpdate) {
      throw new AppError('File Not Found', NOT_FOUND);
    }
    if (userId !== fileToUpdate.author) {
      throw new AppError('Unauthorized', UNAUTHORIZED);
    }
    const existingFileName = await this.cloudFileDAO.findOne({
      name,
      author: userId,
    });
    if (existingFileName) {
      throw new AppError('File name already exists.', CONFLICT);
    }

    const updatedFile = await this.cloudFileDAO.updateEntity(fileId, {
      name,
    });

    return { ...updatedFile, prevPath: fileToUpdate.path };
  }

  async deleteFile(fileId, userId) {
    const fileToDelete = await this.cloudFileDAO.findById(fileId);
    if (!fileToDelete) {
      throw new AppError('File Not Found', NOT_FOUND);
    }
    if (userId !== fileToDelete.author) {
      throw new AppError('Unauthorized', UNAUTHORIZED);
    }
    const deletedFile = await this.cloudFileDAO.deleteEntity(fileId);
    await this.eventBus.emitUserEvent('delete-file', userId, fileToDelete.size);
    return deletedFile;
  }
}

module.exports = CloudFileService;
