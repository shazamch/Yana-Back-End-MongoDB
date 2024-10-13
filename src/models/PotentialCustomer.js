const mongoose = require('mongoose');

const potentialCustomerSchema = new mongoose.Schema({
  MemberID: { // CamelCase naming convention
    type: String,
    maxlength: 45,
    required: true,
    unique: true, // Ensure uniqueness
  },
  Name: { // CamelCase naming convention
    type: String,
    maxlength: 45,
    required: true,
  },
  MedicaidID: {
    type: String,
    maxlength: 45,
  },
  Phone: {
    type: String,
    maxlength: 45,
  },
  Address: {
    type: String,
    maxlength: 255,
  },
  DeliveryNote: {
    type: String,
    maxlength: 45,
  },
  PreferredDeliveryTime: {
    type: String,
    maxlength: 45,
  },
  AlternateContactName: {
    type: String,
    maxlength: 45,
  },
  AlternateContactPhone: {
    type: String,
    maxlength: 45,
  },
  AlternateContactAddress: {
    type: String,
    maxlength: 255,
  },
  Allergies: {
    type: String,
    maxlength: 45,
  },
  MemberDOB: {
    type: Date,
    required: true,
  },
  IOType: {
    type: String,
    maxlength: 45,
  },
  AuthNumberFacets: {
    type: String,
    maxlength: 45,
  },
  StartDT: {
    type: Date,
  },
  EndDT: {
    type: Date,
  },
  ICD10Code: {
    type: String,
    maxlength: 45,
  },
  Status: {
    type: String,
    maxlength: 45,
    default: 'Pending',
  },
  CoordinatorID: { // Use camelCase
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Coordinator', // Reference to the Coordinator model
    required: false,
  },
  InsuranceID: { // Use camelCase
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Insurance', // Reference to the Insurance model
    required: false,
  },
}, {
  collection: 'PotentialCustomers', // Specify the collection name
  timestamps: true, // Automatically add createdAt and updatedAt fields
});

module.exports = mongoose.model('PotentialCustomer', potentialCustomerSchema);
