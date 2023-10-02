const BaseDAO = require('../../../DAO/BaseDAO');
const University = require('../models/University');

class UniversityDAO extends BaseDAO {
  static #isInternalConstructing = false;

  constructor() {
    super(University);
    if (!UniversityDAO.#isInternalConstructing) {
      throw new TypeError('PrivateConstructor is not constructable');
    }
    UniversityDAO.#isInternalConstructing = false;
  }

  static getInstance() {
    UniversityDAO.#isInternalConstructing = true;

    if (!UniversityDAO.instance) {
      UniversityDAO.instance = new UniversityDAO();
    }
    return UniversityDAO.instance;
  }

  async findByName(universityName) {
    const university = await this.Model.findOne({ name: universityName });
    return this.formatEntity(university);
  }
}

module.exports = UniversityDAO;
