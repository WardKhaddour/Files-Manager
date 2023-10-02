const BaseDAO = require('../../../DAO/BaseDAO');
const CloudFile = require('../models/CloudFile');

class CloudFileDAO extends BaseDAO {
  static #isInternalConstructing = false;

  constructor() {
    super(CloudFile);
    if (!CloudFileDAO.#isInternalConstructing) {
      throw new TypeError('PrivateConstructor is not constructable');
    }
    CloudFileDAO.#isInternalConstructing = false;
  }

  static getInstance() {
    CloudFileDAO.#isInternalConstructing = true;

    if (!CloudFileDAO.instance) {
      CloudFileDAO.instance = new CloudFileDAO();
    }
    return CloudFileDAO.instance;
  }

  async findOne(filter) {
    const cloudFile = await this.Model.findOne(filter);
    return this.formatEntity(cloudFile);
  }
}

module.exports = CloudFileDAO;
