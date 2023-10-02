const { NOT_FOUND, CONFLICT } = require('http-status-codes').StatusCodes;

const AppError = require('../../../utils/AppError');

class FacultyService {
  constructor(facultyDAO) {
    this.facultyDAO = facultyDAO;
  }

  async getAllFaculties(universityId) {
    return this.facultyDAO.findAll(universityId);
  }

  async getFacultyById(facultyId) {
    return this.facultyDAO.findById(facultyId);
  }

  async getFacultyByName(facultyName) {
    return this.facultyDAO.findByName(facultyName);
  }

  async getFacultyInfo(facultyId) {
    return this.facultyDAO.getInfo(facultyId);
  }

  async createFaculty({ name, university, sections }) {
    const existingName = await this.facultyDAO.findByName(name);
    if (existingName) {
      throw new AppError('Name already exists', CONFLICT);
    }
    return this.facultyDAO.createEntity({ name, university, sections });
  }

  async updateFaculty({ facultyId, name, university, sections }) {
    const facultyToUpdate = await this.facultyDAO.findById(facultyId);
    if (!facultyToUpdate) {
      throw new AppError('Faculty Not Found', NOT_FOUND);
    }
    const existingFaculty = await this.facultyDAO.findByName(name);
    if (existingFaculty && existingFaculty.id !== facultyId) {
      throw new AppError('Name already exists', CONFLICT);
    }
    const updatedFaculty = await this.facultyDAO.updateEntity(facultyId, {
      name,
      university,
      sections,
    });

    return updatedFaculty;
  }

  async deleteFaculty(facultyId) {
    const deletedFaculty = await this.facultyDAO.deleteEntity(facultyId);
    return deletedFaculty;
  }
}

module.exports = FacultyService;
