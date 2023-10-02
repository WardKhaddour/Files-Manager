const { EventEmitter } = require('node:events');

class FolderEventProcessor extends EventEmitter {
  constructor(folderDAO) {
    super();
    this.folderDAO = folderDAO;

    this.on('get-folder-details', this.getFolderDetails.bind(this));
  }

  async getFolderDetails(folderId) {
    try {
      const folder = await this.folderDAO.findById(folderId);
      this.emit('get-folder-details-response', {
        type: folder?.type,
        author: folder?.author,
      });
    } catch (err) {
      this.emit('get-folder-details-error', err);
    } finally {
      this.cleanupEventListeners('get-folder-details');
    }
  }

  cleanupEventListeners(event) {
    this.removeAllListeners(`${event}-response`);
    this.removeAllListeners(`${event}-error`);
  }
}

module.exports = FolderEventProcessor;
