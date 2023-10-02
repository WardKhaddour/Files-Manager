const mongoose = require('mongoose');
const validateRef = require('../../../validators/DBModelsRef/validateRef');

const FacultySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },
  university: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'University',
    required: true,
    validate: validateRef('University'),
  },
  sections: {
    type: [String],
    required: true,
    default: ['global'],
  },
  yearsNum: {
    type: Number,
    default: 4,
  },
});

const Faculty = mongoose.model('Faculty', FacultySchema);

module.exports = Faculty;
