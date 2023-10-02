const FacultyDAO = require('./DAO/FacultyDAO');
const FacultyServices = require('./services/FacultyService');
const FacultyController = require('./controllers/FacultyController');

const facultyDAO = FacultyDAO.getInstance();
const facultyService = new FacultyServices(facultyDAO);
const facultyController = new FacultyController(facultyService);

module.exports = {
  facultyController,
};
