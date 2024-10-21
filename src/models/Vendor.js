const mongoose = require('mongoose');

const VendorSchema = new mongoose.Schema({
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
  Name: {
    type: String,
    maxlength: 45,
    required: true,
  },
  Phone: {
    type: String,
    maxlength: 45,
    required: true,
    unique: true,
  },
  Email: {
    type: String,
    maxlength: 45,
    required: true,
    unique: true,
  },
  Address: {
    type: String,
    maxlength: 45,
    default: null,
  },
  ProfilePhotoPath: {
    type: String,
    maxlength: 45,
    default: null,
  },
  Rating: {
    type: Number,
    default: null,
    min: 0,
    max: 10,
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
  collection: 'Vendor',
  timestamps: true,
});

module.exports = mongoose.model('Vendor', VendorSchema);
