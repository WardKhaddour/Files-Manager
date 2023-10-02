const ProjectDAO = require('./DAO/ProjectDAO');
const ProjectServices = require('./services/ProjectService');
const ProjectController = require('./controllers/ProjectController');
const eventBus = require('../../events');

const projectDAO = ProjectDAO.getInstance();
const projectService = new ProjectServices(projectDAO, eventBus);
const projectController = new ProjectController(projectService);

module.exports = { projectController };
