const mongoose = require('mongoose');
const validateRef = require('../../../validators/DBModelsRef/validateRef');

const FileSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      validate: validateRef('User'),
    },
    path: {
      type: String,
      required: true,
    },
    course: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Course',
      validate: [
        {
          validator(value) {
            return !value || !this.folder;
          },
          message: 'Either course or Folder must be provided, but not both.',
        },
        validateRef('Course'),
      ],
    },
    folder: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Folder',
      validate: [
        {
          validator(value) {
            return !value || !this.course;
          },
          message: 'Either course or Folder must be provided, but not both.',
        },
        validateRef('Folder'),
      ],
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

FileSchema.virtual('fileLink').get(function () {
  const currentUrl =
    process.env.NODE_ENV === 'production'
      ? process.env.PROD_URL
      : process.env.DEV_URL;

  const fileUrl = `${currentUrl}/${this.path?.split('public/')[1]}`;
  return fileUrl;
});
const File = mongoose.model('File', FileSchema);

module.exports = File;
