const { OK, NO_CONTENT, CREATED } = require('http-status-codes').StatusCodes;
const catchAsync = require('../../../utils/catchAsync');
const { deleteFile } = require('../../../utils/file');

class CloudFileController {
  constructor(cloudFileService) {
    this.cloudFileService = cloudFileService;
  }

  getMyCloud = catchAsync(async (req, res) => {
    const { userId } = req;
    const myCloud = await this.cloudFileService.getMyCloud(userId);
    res.status(OK).json({
      success: true,
      message: undefined,
      data: myCloud,
    });
  });

  getFileById = catchAsync(async (req, res) => {
    const { fileId } = req.params;
    const { userId } = req;
    const file = await this.cloudFileService.getFileById(fileId, userId);
    res.status(OK).json({
      success: true,
      message: undefined,
      data: file,
    });
  });

  createFile = catchAsync(async (req, res) => {
    const { name } = req.body;
    const { path, size } = req.file;
    const author = req.userId;
    try {
      const createdFile = await this.cloudFileService.createFile({
        name,
        path,
        author,
        size,
      });
      res.status(CREATED).json({
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
    const { name } = req.body;
    const { fileId } = req.params;
    const { userId } = req;

    const updatedFile = await this.cloudFileService.updateFile(
      {
        fileId,
        name,
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
    const deletedFile = await this.cloudFileService.deleteFile(fileId, userId);
    await deleteFile(deletedFile.path);
    res.status(NO_CONTENT).json({
      success: true,
      message: 'File deleted successfully',
      data: deletedFile,
    });
  });
}

module.exports = CloudFileController;
