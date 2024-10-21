const mongoose = require('mongoose');

const RidersSchema = new mongoose.Schema({
Username: {
    type: String,
    maxlength: 45,
    unique: true,
    required: true,
  },
  Password: {
    type: String,
    maxlength: 64,
    required: true,
  },
  Phone: {
    type: String,
    maxlength: 45,
    required: true,
  },
  Email: {
    type: String,
    maxlength: 45,
    required: true,
  },
  ProfilePhotoPath: {
    type: String,
    maxlength: 45,
    default: null,
  },
  Address: {
    type: String,
    maxlength: 45,
    default: null,
  },
  Status: {
    type: String,
    maxlength: 45,
    default: null,
  },
  SecurityQuestion: {
    type: String,
    maxlength: 100,
    default: null,
  },
}, {
  collection: 'Rider',
  timestamps: true,
});

module.exports = mongoose.model('Rider', RidersSchema);
