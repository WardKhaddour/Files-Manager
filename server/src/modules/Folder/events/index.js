const FolderDAO = require('../DAO/FolderDAO');
const FolderEventProcessor = require('./FolderEventProcessor');

const folderDAO = FolderDAO.getInstance();
const folderEventProcessor = new FolderEventProcessor(folderDAO);

module.exports = folderEventProcessor;
