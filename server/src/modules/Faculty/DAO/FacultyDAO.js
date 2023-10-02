const BaseDAO = require('../../../DAO/BaseDAO');
const Faculty = require('../models/Faculty');

class FacultyDAO extends BaseDAO {
  static #isInternalConstructing = false;

  constructor() {
    super(Faculty);
    if (!FacultyDAO.#isInternalConstructing) {
      throw new TypeError('PrivateConstructor is not constructable');
    }
    FacultyDAO.#isInternalConstructing = false;
  }

  static getInstance() {
    FacultyDAO.#isInternalConstructing = true;

    if (!FacultyDAO.instance) {
      FacultyDAO.instance = new FacultyDAO();
    }
    return FacultyDAO.instance;
  }

  async findAll(universityId) {
    const faculties = await this.Model.find({ university: universityId });
    return faculties.map(faculty => this.formatEntity(faculty));
  }

  async findByName(facultyName) {
    const faculty = await this.Model.findOne({ name: facultyName });
    return this.formatEntity(faculty);
  }

  async getInfo(facultyId) {
    const data = await this.Model.findById(facultyId).select(
      'sections yearsNum'
    );
    const { sections, yearsNum } = data;
    return {
      sections,
      yearsNum,
    };
  }
}

module.exports = FacultyDAO;
