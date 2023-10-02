const { NOT_FOUND, BAD_REQUEST, UNAUTHORIZED } =
  require('http-status-codes').StatusCodes;

const AppError = require('../../../utils/AppError');

class FolderService {
  constructor(folderDAO, eventBus) {
    this.folderDAO = folderDAO;
    this.eventBus = eventBus;
  }

  async getAllFolders(universityId) {
    return this.folderDAO.findAll(universityId);
  }

  async getFolderById({ folderId, userId }) {
    const [savedFiles, folder] = await Promise.all([
      this.eventBus.emitUserEvent('get-saved-files', userId),
      this.folderDAO.findById(folderId),
    ]);
    folder.files = folder.files?.map(file => ({
      ...file,
      isSaved: savedFiles?.includes(file.id),
    }));
    return folder;
  }

  async getFolderByName(folderName) {
    return this.folderDAO.findByName(folderName);
  }

  async getFolderAuthor(folderId) {
    return this.folderDAO.getFolderAuthor(folderId);
  }

  async createFolder(folderData, userId) {
    const { author, name, parentFolder, type, course } = folderData;

    // Only author of parent folder can add new folders inside it
    if (
      parentFolder &&
      userId !== (await this.folderDAO.findById(parentFolder))?.author
    ) {
      throw new AppError('Unauthorized', UNAUTHORIZED);
    }
    const courseTeachers = await this.eventBus.emitCourseEvent(
      'get-course-teachers',
      course
    );

    // Only teachers in course can add new folders inside it
    if (course && !courseTeachers?.includes(userId)) {
      throw new AppError(
        'Unauthorized, You are not a teacher in this course',
        UNAUTHORIZED
      );
    }
    return this.folderDAO.createEntity({
      author,
      name,
      parentFolder,
      type,
      course,
    });
  }

  async updateFolder(folderData, userId) {
    const { folderId, name, parentFolder, type, course } = folderData;

    const folderToUpdate = await this.folderDAO.findById(folderId, {
      populate: ['files', 'projects'],
    });
    if (!folderToUpdate) {
      throw new AppError('Folder Not Found', NOT_FOUND);
    }
    if (folderId === parentFolder) {
      throw new AppError('Folder Cannot be parent for itself', BAD_REQUEST);
    }
    if (userId !== folderToUpdate.author) {
      throw new AppError('Unauthorized', UNAUTHORIZED);
    }
    if (
      type === 'projects-folder' &&
      type !== folderToUpdate.type &&
      folderToUpdate.files?.length
    ) {
      throw new AppError(
        'Folder is not empty, cannot change its type',
        BAD_REQUEST
      );
    }
    if (
      type === 'files-folder' &&
      type !== folderToUpdate.type &&
      folderToUpdate.projects?.length
    ) {
      throw new AppError(
        'Folder is not empty, cannot change its type',
        BAD_REQUEST
      );
    }

    const updatedFolder = await this.folderDAO.updateEntity(folderId, {
      name,
      parentFolder,
      type,
      course,
    });

    return updatedFolder;
  }

  async deleteFolder(folderId, userId) {
    const folderToDelete = await this.folderDAO.findById(folderId);
    if (userId !== folderToDelete.author) {
      throw new AppError('Unauthorized', UNAUTHORIZED);
    }
    const deletedFolder = await this.folderDAO.deleteEntity(folderId);
    return deletedFolder;
  }
}

module.exports = FolderService;
