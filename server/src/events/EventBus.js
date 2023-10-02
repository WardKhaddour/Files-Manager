class EventBus {
  constructor(userEventProcessor, courseEventProcessor, folderEventProcessor) {
    this.userEventProcessor = userEventProcessor;
    this.courseEventProcessor = courseEventProcessor;
    this.folderEventProcessor = folderEventProcessor;
  }

  async emitEvent(processor, event, ...data) {
    return new Promise((resolve, reject) => {
      processor.once(`${event}-response`, res => resolve(res));
      processor.once(`${event}-error`, err => reject(err));
      processor.emit(event, ...data);
    });
  }

  async emitUserEvent(event, ...data) {
    return this.emitEvent(this.userEventProcessor, event, ...data);
  }

  async emitCourseEvent(event, ...data) {
    return this.emitEvent(this.courseEventProcessor, event, ...data);
  }

  async emitFolderEvent(event, ...data) {
    return this.emitEvent(this.folderEventProcessor, event, ...data);
  }
}

module.exports = EventBus;
