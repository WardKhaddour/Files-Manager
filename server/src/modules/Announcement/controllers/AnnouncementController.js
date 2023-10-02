const { OK, CREATED, NO_CONTENT } = require('http-status-codes').StatusCodes;
const catchAsync = require('../../../utils/catchAsync');
const { deleteFile } = require('../../../utils/file');

class AnnouncementController {
  constructor(announcementService) {
    this.announcementService = announcementService;
  }

  getAllAnnouncements = catchAsync(async (req, res) => {
    const { year, section, university, faculty } = req.query;
    const announcements = await this.announcementService.getAllAnnouncements({
      year,
      section,
      university,
      faculty,
    });

    res.status(OK).json({
      success: true,
      message: undefined,
      data: { announcements },
    });
  });

  createAnnouncement = catchAsync(async (req, res) => {
    const { name, type, university, faculty, year, section } = req.body;
    const { path } = req.file;
    const author = req.userId;

    try {
      const announcement = await this.announcementService.createAnnouncement({
        name,
        type,
        path,
        author,
        year,
        section,
        university,
        faculty,
      });

      res.status(CREATED).json({
        success: true,
        message: 'Announcement created successfully',
        data: { announcement },
      });
    } catch (err) {
      await deleteFile(path);
      throw err;
    }
  });

  deleteAnnouncement = catchAsync(async (req, res) => {
    const { announcementId } = req.params;

    const user = req.userId;

    const deletedAnnouncement =
      await this.announcementService.deleteAnnouncement(announcementId, user);
    await deleteFile(deletedAnnouncement.path);

    res.status(NO_CONTENT).json({
      success: true,
      message: 'Announcement deleted successfully',
    });
  });
}

module.exports = AnnouncementController;
