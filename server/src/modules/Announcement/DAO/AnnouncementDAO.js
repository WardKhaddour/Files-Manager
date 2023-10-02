const BaseDAO = require('../../../DAO/BaseDAO');
const Announcement = require('../models/Announcement');

class AnnouncementDAO extends BaseDAO {
  static #isInternalConstructing = false;

  constructor() {
    super(Announcement);
    if (!AnnouncementDAO.#isInternalConstructing) {
      throw new TypeError('PrivateConstructor is not constructable');
    }
    AnnouncementDAO.#isInternalConstructing = false;
  }

  static getInstance() {
    AnnouncementDAO.#isInternalConstructing = true;

    if (!AnnouncementDAO.instance) {
      AnnouncementDAO.instance = new AnnouncementDAO();
    }
    return AnnouncementDAO.instance;
  }

  async findAll({ university, faculty, year, section }) {
    const announcements = await this.Model.find({
      university,
      faculty,
      year: { $in: [year] },
      section: { $in: [section] },
    });
    return announcements.map(announcement => this.formatEntity(announcement));
  }

  async findByName(name) {
    const announcement = await this.Model.findOne({ name });
    return this.formatEntity(announcement);
  }

  async findOne({ name, university, faculty, year, section }) {
    const announcement = await this.Model.findOne({
      name,
      university,
      faculty,
      year,
      section,
    });
    return this.formatEntity(announcement);
  }
}

module.exports = AnnouncementDAO;
