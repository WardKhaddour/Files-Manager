const { CONFLICT, UNAUTHORIZED } = require('http-status-codes').StatusCodes;
const AppError = require('../../../utils/AppError');

class AnnouncementService {
  constructor(announcementDAO) {
    this.announcementDAO = announcementDAO;
  }

  async getAllAnnouncements({ university, faculty, year, section }) {
    return this.announcementDAO.findAll({ university, faculty, year, section });
  }

  async createAnnouncement({
    name,
    author,
    type,
    path,
    university,
    faculty,
    year,
    section,
  }) {
    const existingAnnouncement = await this.announcementDAO.findOne({
      name,
      university,
      faculty,
      year,
      section,
    });
    if (existingAnnouncement) {
      throw new AppError('Name already exists', CONFLICT);
    }
    return this.announcementDAO.createEntity({
      name,
      author,
      type,
      path,
      university,
      faculty,
      year,
      section,
    });
  }

  async deleteAnnouncement(announcementId, author) {
    const existingAnnouncement = await this.announcementDAO.findById(
      announcementId
    );

    if (existingAnnouncement.author !== author) {
      throw new AppError(
        'You are not allowed to delete this file',
        UNAUTHORIZED
      );
    }

    return this.announcementDAO.deleteEntity(announcementId);
  }
}

module.exports = AnnouncementService;
