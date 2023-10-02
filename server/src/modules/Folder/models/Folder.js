const mongoose = require('mongoose');
const validateRef = require('../../../validators/DBModelsRef/validateRef');

const FolderSchema = new mongoose.Schema(
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
    type: {
      type: String,
      enum: ['files-folder', 'projects-folder'],
      default: 'files-folder',
    },
    course: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Course',
      validate: [
        {
          validator(value) {
            return !value || !this.parentFolder;
          },
          message:
            'Either course or parent folder must be provided, but not both.',
        },
        validateRef('Course'),
      ],
    },
    parentFolder: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Folder',
      validate: [
        {
          validator(value) {
            return !value || !this.course;
          },
          message:
            'Either course or parent folder must be provided, but not both.',
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

FolderSchema.virtual('files', {
  ref: 'File',
  foreignField: 'folder',
  localField: '_id',
});

FolderSchema.virtual('folders', {
  ref: 'Folder',
  foreignField: 'parentFolder',
  localField: '_id',
});

FolderSchema.virtual('projects', {
  ref: 'Project',
  foreignField: 'folder',
  localField: '_id',
});

const Folder = mongoose.model('Folder', FolderSchema);

module.exports = Folder;
