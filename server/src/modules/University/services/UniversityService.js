const { NOT_FOUND, CONFLICT } = require('http-status-codes').StatusCodes;

const AppError = require('../../../utils/AppError');

class UniversityService {
  constructor(universityDAO) {
    this.universityDAO = universityDAO;
  }

  async getAllUniversities() {
    return this.universityDAO.findAll();
  }

  async getUniversityById(universityId) {
    return this.universityDAO.findById(universityId);
  }

  async getUniversityByName(universityName) {
    return this.universityDAO.findByName(universityName);
  }

  async createUniversity({ name, city, country }) {
    const existingName = await this.universityDAO.findByName(name);
    if (existingName) {
      throw new AppError('Name already exists', CONFLICT);
    }
    return this.universityDAO.createEntity({ name, city, country });
  }

  async updateUniversity({ universityId, name, city, country }) {
    const universityToUpdate = await this.universityDAO.findById(universityId);
    if (!universityToUpdate) {
      throw new AppError('University Not Found', NOT_FOUND);
    }
    const existingUniversity = await this.universityDAO.findByName(name);
    if (existingUniversity && existingUniversity.id !== universityId) {
      throw new AppError('Name already exists', CONFLICT);
    }
    const updatedUniversity = await this.universityDAO.updateEntity(
      universityId,
      { name, city, country }
    );

    return updatedUniversity;
  }

  async deleteUniversity(universityId) {
    const deletedUniversity = await this.universityDAO.deleteEntity(
      universityId
    );
    return deletedUniversity;
  }
}

module.exports = UniversityService;
