const BaseDAO = require('../../../DAO/BaseDAO');
const Project = require('../models/Project');

class ProjectDAO extends BaseDAO {
  static #isInternalConstructing = false;

  constructor() {
    super(Project);
    if (!ProjectDAO.#isInternalConstructing) {
      throw new TypeError('PrivateConstructor is not constructable');
    }
    ProjectDAO.#isInternalConstructing = false;
  }

  static getInstance() {
    ProjectDAO.#isInternalConstructing = true;

    if (!ProjectDAO.instance) {
      ProjectDAO.instance = new ProjectDAO();
    }
    return ProjectDAO.instance;
  }
}

module.exports = ProjectDAO;
