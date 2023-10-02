const BaseDAO = require('../../../DAO/BaseDAO');
const File = require('../models/File');

class FileDAO extends BaseDAO {
  static #isInternalConstructing = false;

  constructor() {
    super(File);
    if (!FileDAO.#isInternalConstructing) {
      throw new TypeError('PrivateConstructor is not constructable');
    }
    FileDAO.#isInternalConstructing = false;
  }

  static getInstance() {
    FileDAO.#isInternalConstructing = true;

    if (!FileDAO.instance) {
      FileDAO.instance = new FileDAO();
    }
    return FileDAO.instance;
  }

  async getFileInCourse(fileName, courseId) {
    const file = await this.Model.findOne({
      name: fileName,
      course: courseId,
    });
    return this.formatEntity(file);
  }

  async getFileInFolder(fileName, folderId) {
    const file = await this.Model.findOne({
      name: fileName,
      folder: folderId,
    });
    return this.formatEntity(file);
  }
}

module.exports = FileDAO;
