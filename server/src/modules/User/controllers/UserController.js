const { OK, NO_CONTENT } = require('http-status-codes').StatusCodes;
const catchAsync = require('../../../utils/catchAsync');
const { deleteFile } = require('../../../utils/file');

class UserController {
  constructor(userService) {
    this.userService = userService;
  }

  getAllUsers = catchAsync(async (req, res) => {
    const users = await this.userService.getAllUsers();
    res.status(OK).json({
      success: true,
      message: undefined,
      data: { users },
    });
  });

  getUser = catchAsync(async (req, res) => {
    const { userId } = req.params;
    const user = await this.userService.getUser(userId);
    res.status(OK).json({
      success: true,
      message: undefined,
      data: { user },
    });
  });

  getAuthStatus = catchAsync(async (req, res) => {
    const { userId } = req;
    const user = await this.userService.getUser(userId);
    res.status(OK).json({
      success: true,
      message: undefined,
      data: { user },
    });
  });

  searchForUsers = catchAsync(async (req, res) => {
    const { search, role } = req.query;
    const users = await this.userService.searchForUsers({ search, role });
    res.status(OK).json({
      success: true,
      message: undefined,
      data: { users },
    });
  });

  updateMe = catchAsync(async (req, res) => {
    const { userId } = req;
    const { email, name, university, faculty, year, section } = req.body;
    let photoSrc = null;
    let oldPhotoPath = null;
    try {
      if (req.file) {
        photoSrc = req.file.filename;
        const userPhotoSrc = await this.userService.getUserPhotoSrc(userId);
        if (userPhotoSrc !== 'default-user-photo.png') {
          oldPhotoPath = `public/images/users/${userPhotoSrc}`;
        }
      }
      const updatedUser = await this.userService.updateMe({
        userId,
        email,
        name,
        university,
        faculty,
        year,
        section,
        photoSrc,
      });
      if (photoSrc && oldPhotoPath) {
        await deleteFile(oldPhotoPath);
      }

      res.status(OK).json({
        success: true,
        message: 'User Updated Successfully',
        data: { user: updatedUser },
      });
    } catch (error) {
      await deleteFile(photoSrc);
      throw error;
    }
  });

  getSavedFiles = catchAsync(async (req, res) => {
    const { userId } = req;

    const savedFiles = await this.userService.getSavedFiles(userId);

    res.status(OK).json({
      success: true,
      message: undefined,
      data: { savedFiles },
    });
  });

  toggleSaveFile = catchAsync(async (req, res) => {
    const { userId } = req;
    const { fileId } = req.params;

    await this.userService.toggleSaveFile({
      userId,
      fileId,
    });

    res.status(OK).json({
      success: true,
      message: undefined,
      data: {},
    });
  });

  getCloudStats = catchAsync(async (req, res) => {
    const { userId } = req;
    const stats = await this.userService.getCloudStats(userId);
    res.status(OK).json({
      success: true,
      message: undefined,
      data: { stats },
    });
  });

  deleteMyPhoto = catchAsync(async (req, res) => {
    const { userId } = req;
    const userPhotoSrc = await this.userService.getUserPhotoSrc(userId);
    if (userPhotoSrc !== 'default-user-photo.png') {
      deleteFile(`public/images/users/${userPhotoSrc}`);
      await this.userService.deleteUserPhoto(userId);
    }
    res.status(OK).json({
      success: true,
      message: 'Photo deleted Successfully',
      data: undefined,
    });
  });

  deleteMe = catchAsync(async (req, res) => {
    const { password } = req.body;
    const { userId } = req;
    await this.userService.deleteMe({ userId, password });
    res.status(NO_CONTENT).json({
      success: true,
    });
  });

  deleteUser = catchAsync(async (req, res) => {
    const { userId } = req.params;
    await this.userService.deleteUser(userId);
    res.status(NO_CONTENT).json({
      success: true,
    });
  });
}

module.exports = UserController;
