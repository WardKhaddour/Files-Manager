const BaseDAO = require('../../../DAO/BaseDAO');
const Folder = require('../models/Folder');

class FolderDAO extends BaseDAO {
  static #isInternalConstructing = false;

  constructor() {
    super(Folder);
    if (!FolderDAO.#isInternalConstructing) {
      throw new TypeError('PrivateConstructor is not constructable');
    }
    FolderDAO.#isInternalConstructing = false;
  }

  static getInstance() {
    FolderDAO.#isInternalConstructing = true;

    if (!FolderDAO.instance) {
      FolderDAO.instance = new FolderDAO();
    }
    return FolderDAO.instance;
  }

  async findById(folderId) {
    const entity = await this.Model.findById(folderId)
      .populate({
        path: 'folders',
        populate: {
          path: 'author',
          select: '_id name photo photoSrc',
        },
      })
      .populate({
        path: 'files',
        populate: {
          path: 'author',
          select: '_id name photo photoSrc',
        },
      });
    return this.formatEntity(entity);
  }

  async getFolderType(folderId) {
    return (await this.Model.findById(folderId).select('+type')).toObject()
      .type;
  }
}

module.exports = FolderDAO;
