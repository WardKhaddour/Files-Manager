const { OK, NO_CONTENT, CREATED, BAD_REQUEST } =
  require('http-status-codes').StatusCodes;
const AppError = require('../../../utils/AppError');
const catchAsync = require('../../../utils/catchAsync');

class FolderController {
  constructor(folderService) {
    this.folderService = folderService;
  }

  getFolderById = catchAsync(async (req, res) => {
    const { folderId } = req.params;
    const { userId } = req;
    const folder = await this.folderService.getFolderById({ folderId, userId });
    res.status(OK).json({
      success: true,
      message: undefined,
      data: { folder },
    });
  });

  createFolder = catchAsync(async (req, res, next) => {
    const { name, parentFolder, type, course } = req.body;
    const { userId } = req;
    if ((parentFolder && course) || (!parentFolder && !course)) {
      return next(
        new AppError(
          'Only one of parent folder or course is allowed',
          BAD_REQUEST
        )
      );
    }
    const createdFolder = await this.folderService.createFolder(
      {
        name,
        parentFolder,
        course,
        type,
        author: userId,
      },
      userId
    );
    return res.status(CREATED).json({
      success: true,
      message: 'Folder created successfully',
      data: createdFolder,
    });
  });

  updateFolder = catchAsync(async (req, res) => {
    const { name, parentFolder, type, course } = req.body;
    const { folderId } = req.params;
    const { userId } = req;
    const updatedFolder = await this.folderService.updateFolder(
      {
        folderId,
        name,
        parentFolder,
        type,
        course,
      },
      userId
    );
    res.status(OK).json({
      success: true,
      message: 'Folder updated successfully',
      data: updatedFolder,
    });
  });

  deleteFolder = catchAsync(async (req, res) => {
    const { folderId } = req.params;
    const { userId } = req;
    const deletedFolder = await this.folderService.deleteFolder(
      folderId,
      userId
    );
    res.status(NO_CONTENT).json({
      success: true,
      message: 'Folder deleted successfully',
      data: deletedFolder,
    });
  });
}

module.exports = FolderController;
