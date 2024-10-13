const mongoose = require('mongoose');

const adminSchema = new mongoose.Schema({
  Username: {
    type: String,
    required: true,
    unique: true,
    maxlength: 45,
  },
  Password: {
    type: String,
    required: true,
    maxlength: 64,
  },
  Phone: {
    type: String,
    maxlength: 45,
  },
  Email: {
    type: String,
    maxlength: 45,
  },
  ProfilePhotoPath: {
    type: String,
    maxlength: 45,
  },
  Address: {
    type: String,
    maxlength: 45,
  },
  Role: {
    type: String,
    enum: ['Super Admin', 'Admin'],
    default: 'Admin',
    required: true,
  },
  Status: {
    type: String,
    maxlength: 45,
  },
  SecurityQuestion: {
    type: String,
    maxlength: 100,
  },
}, {
  collection: 'Admin',
  timestamps: true, // This will automatically add `createdAt` and `updatedAt` fields
});

module.exports = mongoose.model('Admin', adminSchema);
