const { OK, NO_CONTENT, CREATED, BAD_REQUEST } =
  require('http-status-codes').StatusCodes;
const AppError = require('../../../utils/AppError');
const catchAsync = require('../../../utils/catchAsync');
const { deleteFile } = require('../../../utils/file');

class FileController {
  constructor(fileService) {
    this.fileService = fileService;
  }

  getFileById = catchAsync(async (req, res) => {
    const { fileId } = req.params;
    const file = await this.fileService.getFileById(fileId);
    res.status(OK).json({
      success: true,
      message: undefined,
      data: file,
    });
  });

  createFile = catchAsync(async (req, res, next) => {
    const { name, course, folder } = req.body;
    const { path } = req.file;
    const author = req.userId;
    if ((folder && course) || (!folder && !course)) {
      return next(
        new AppError(
          'Only one of parent folder or course is allowed',
          BAD_REQUEST
        )
      );
    }
    try {
      const createdFile = await this.fileService.createFile({
        name,
        course,
        path,
        folder,
        author,
      });
      return res.status(CREATED).json({
        success: true,
        message: 'File created successfully',
        data: createdFile,
      });
    } catch (err) {
      await deleteFile(path);
      throw err;
    }
  });

  updateFile = catchAsync(async (req, res) => {
    const { name, course, folder } = req.body;
    const { fileId } = req.params;
    const { userId } = req;
    const updatedFile = await this.fileService.updateFile(
      {
        fileId,
        name,
        course,
        folder,
      },
      userId
    );

    res.status(OK).json({
      success: true,
      message: 'File updated successfully',
      data: updatedFile,
    });
  });

  deleteFile = catchAsync(async (req, res) => {
    const { fileId } = req.params;
    const { userId } = req;
    const deletedFile = await this.fileService.deleteFile(fileId, userId);
    deleteFile(deletedFile.path);
    res.status(NO_CONTENT).json({
      success: true,
      message: 'File deleted successfully',
      data: deletedFile,
    });
  });
}

module.exports = FileController;
