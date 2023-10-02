const UniversityDAO = require('./DAO/UniversityDAO');
const UniversityServices = require('./services/UniversityService');
const UniversityController = require('./controllers/UniversityController');

const universityDAO = UniversityDAO.getInstance();
const universityService = new UniversityServices(universityDAO);
const universityController = new UniversityController(universityService);

module.exports = {
  universityController,
};
