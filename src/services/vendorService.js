const Vendor = require('../models/Vendor');

exports.createVendor = async (vendorData) => {
  try {
    const newVendor = await Vendor.create(vendorData); // Create a new vendor
    return newVendor;
  } catch (error) {
    throw new Error('Error creating vendor: ' + error.message);
  }
};

exports.getAllVendors = async () => {
  try {
    const vendors = await Vendor.find(); // Retrieve all vendors
    return vendors;
  } catch (error) {
    throw new Error('Error retrieving vendors: ' + error.message);
  }
};

exports.getVendorById = async (id) => {
  try {
    const vendor = await Vendor.findById(id); // Retrieve vendor by ID
    if (!vendor) {
      throw new Error('Vendor not found');
    }
    return vendor;
  } catch (error) {
    throw new Error('Error retrieving vendor: ' + error.message);
  }
};

exports.updateVendor = async (id, vendorData) => {
  try {
    const vendor = await Vendor.findByIdAndUpdate(id, vendorData, {
      new: true, // Return the updated vendor
      runValidators: true // Ensure that validation is applied
    });
    if (!vendor) {
      throw new Error('Vendor not found');
    }
    return vendor;
  } catch (error) {
    throw new Error('Error updating vendor: ' + error.message);
  }
};

exports.deleteVendor = async (id) => {
  try {
    const vendor = await Vendor.findByIdAndDelete(id); // Find and delete the vendor by ID
    if (!vendor) {
      throw new Error('Vendor not found');
    }
    return;
  } catch (error) {
    throw new Error('Error deleting vendor: ' + error.message);
  }
};
