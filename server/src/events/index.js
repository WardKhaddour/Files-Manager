const EventBus = require('./EventBus');
const userEventProcessor = require('../modules/User/events');
const courseEventProcessor = require('../modules/Course/events');
const folderEventProcessor = require('../modules/Folder/events');

const eventBus = new EventBus(
  userEventProcessor,
  courseEventProcessor,
  folderEventProcessor
);

module.exports = eventBus;
