const { NOT_FOUND, CONFLICT, UNAUTHORIZED, BAD_REQUEST } =
  require('http-status-codes').StatusCodes;

const AppError = require('../../../utils/AppError');

class FileService {
  constructor(fileDAO, eventBus) {
    this.fileDAO = fileDAO;
    this.eventBus = eventBus;
  }

  async getFileById(fileId) {
    return this.fileDAO.findById(fileId);
  }

  async getFileAuthor(fileId) {
    return this.fileDAO.getFileAuthor(fileId);
  }

  async createFile(fileData) {
    const { author, name, course, folder, path } = fileData;

    const error = await this.validateFileParent({ folder, course, name });
    if (error) {
      throw error;
    }
    return this.fileDAO.createEntity({ author, name, course, folder, path });
  }

  async updateFile(fileData, userId) {
    const { fileId, name, course, folder } = fileData;

    const fileToUpdate = await this.fileDAO.findById(fileId);
    if (!fileToUpdate) {
      throw new AppError('File Not Found', NOT_FOUND);
    }
    if (userId !== fileToUpdate.author) {
      throw new AppError('Unauthorized', UNAUTHORIZED);
    }
    const error = await this.validateFileParent({ folder, course, name });
    if (error) {
      throw error;
    }

    const updatedFile = await this.fileDAO.updateEntity(fileId, {
      name,
      course,
      folder,
    });

    return updatedFile;
  }

  async deleteFile(fileId, userId) {
    const fileToDelete = await this.fileDAO.findById(fileId);
    if (!fileToDelete) {
      throw new AppError('File Not Found', NOT_FOUND);
    }
    if (userId !== fileToDelete.author) {
      throw new AppError('Unauthorized', UNAUTHORIZED);
    }
    const deletedFile = await this.fileDAO.deleteEntity(fileId);
    return deletedFile;
  }

  async validateFileParent({ folder, course, name }) {
    let error;
    const folderType = (
      await this.eventBus.emitFolderEvent('get-folder-details', folder)
    ).type;

    const courseIsFound = await this.eventBus.emitCourseEvent(
      'check-course-exists',
      course
    );
    if (folder && !folderType) {
      error = new AppError('Folder not found', NOT_FOUND);
      return error;
    }

    if (course && !courseIsFound) {
      error = new AppError('Course not found', NOT_FOUND);
      return error;
    }

    if (folderType === 'projects-folder') {
      error = new AppError(
        'You Cannot upload files to projects folder',
        BAD_REQUEST
      );
      return error;
    }

    let existingFileName = null;
    if (course) {
      existingFileName = await this.fileDAO.getFileInCourse(name, course);
    }
    if (folder) {
      existingFileName = await this.fileDAO.getFileInFolder(name, folder);
    }

    if (existingFileName) {
      error = new AppError('File name already exists.', CONFLICT);
      return error;
    }

    return error;
  }
}

module.exports = FileService;
