const mongoose = require('mongoose');

// Define the customer schema
const customerSchema = new mongoose.Schema({
  Username: {
    type: String,
    unique: true,
    maxlength: 45,
    required: true, // Ensure Username is required
  },
  Password: {
    type: String,
    maxlength: 64,
    required: true, // Ensure Password is required
  },
  MemberID: {
    type: String,
    maxlength: 45,
    required: false, // MemberID is optional
  },
  MedicaidID: {
    type: String,
    maxlength: 45,
    required: false, // MedicaidID is optional
  },
  Name: {
    type: String,
    maxlength: 45,
    required: false, // Name is optional
  },
  Phone: {
    type: String,
    maxlength: 45,
    required: false, // Phone is optional
  },
  ProfilePhotoPath: {
    type: String,
    maxlength: 45,
    required: false, // ProfilePhotoPath is optional
  },
  InsuranceCardPhotoPath: {
    type: String,
    maxlength: 45,
    required: false, // InsuranceCardPhotoPath is optional
  },
  Address: {
    type: String,
    maxlength: 255,
    required: false, // Address is optional
  },
  DeliveryNote: {
    type: String,
    maxlength: 45,
    required: false, // DeliveryNote is optional
  },
  PreferredDeliveryTime: {
    type: String,
    maxlength: 45,
    required: false, // PreferredDeliveryTime is optional
  },
  AlternateContactName: {
    type: String,
    maxlength: 45,
    required: false, // AlternateContactName is optional
  },
  AlternateContactPhone: {
    type: String,
    maxlength: 45,
    required: false, // AlternateContactPhone is optional
  },
  AlternateContactAddress: {
    type: String,
    maxlength: 255,
    required: false, // AlternateContactAddress is optional
  },
  Allergies: {
    type: String,
    maxlength: 45,
    required: false, // Allergies is optional
  },
  MemberDOB: {
    type: Date,
    required: false, // MemberDOB is optional
  },
  IOType: {
    type: String,
    maxlength: 45,
    required: false, // IOType is optional
  },
  AuthNumberFacets: {
    type: String,
    maxlength: 45,
    required: false, // AuthNumberFacets is optional
  },
  StartDT: {
    type: Date,
    required: false, // StartDT is optional
  },
  EndDT: {
    type: Date,
    required: false, // EndDT is optional
  },
  ICD10Code: {
    type: String,
    maxlength: 45,
    required: false, // ICD10Code is optional
  },
  Status: {
    type: String,
    maxlength: 45,
    required: false, // Status is optional
  },
  SecurityQuestion: {
    type: String,
    maxlength: 100,
    required: false, // SecurityQuestion is optional
  },
  CoordinatorID: { // Ensure this references the correct model
    type: mongoose.Schema.Types.ObjectId, // Assuming CoordinatorID refers to another document
    ref: 'Coordinator', // Reference to the Coordinator model
    required: false, // CoordinatorID is optional
  },
  InsuranceID: {
    type: mongoose.Schema.Types.ObjectId, // Assuming InsuranceID refers to another document
    ref: 'Insurance', // Reference to the Insurance model
    required: false, // InsuranceID is optional
  },
}, {
  collection: 'Customer', // Specify the collection name
  timestamps: true, // Automatically add createdAt and updatedAt fields
});

// Export the model
module.exports = mongoose.model('Customer', customerSchema);
