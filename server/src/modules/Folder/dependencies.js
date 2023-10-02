const FolderDAO = require('./DAO/FolderDAO');
const FolderServices = require('./services/FolderService');
const FolderController = require('./controllers/FolderController');
const eventBus = require('../../events');

const folderDAO = FolderDAO.getInstance();
const folderService = new FolderServices(folderDAO, eventBus);
const folderController = new FolderController(folderService);

module.exports = { folderController };
