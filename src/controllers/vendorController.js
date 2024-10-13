const vendorService = require('../services/vendorService');
const CustomError = require('../utils/CustomError');

exports.createVendor = async (req, res, next) => {
  try {
    console.log("Request to create vendor:", req.body); // Log the incoming request data

    // Validate input
    if (!req.body.name || !req.body.phone) {
      throw new CustomError('Vendor name and phone are required', 400);
    }

    const newVendor = await vendorService.createVendor(req.body);
    res.status(201).json({ success: true, data: newVendor });
  } catch (error) {
    console.error("Error creating vendor:", error); // Log the error
    next(error); // Pass the error to the errorHandler middleware
  }
};

exports.getAllVendors = async (req, res, next) => {
  try {
    const vendors = await vendorService.getAllVendors();
    res.status(200).json({ success: true, data: vendors });
  } catch (error) {
    console.error("Error retrieving vendors:", error); // Log the error
    next(error); // Pass the error to the errorHandler middleware
  }
};

exports.getVendorById = async (req, res, next) => {
  try {
    const vendor = await vendorService.getVendorById(req.params.id);
    if (!vendor) {
      throw new CustomError("Vendor not found", 404);
    }
    res.status(200).json({ success: true, data: vendor });
  } catch (error) {
    console.error("Error retrieving vendor by ID:", error); // Log the error
    next(error); // Pass the error to the errorHandler middleware
  }
};

exports.updateVendor = async (req, res, next) => {
  try {
    const updatedVendor = await vendorService.updateVendor(req.params.id, req.body);
    if (!updatedVendor) {
      throw new CustomError("Vendor not found or could not be updated", 404);
    }
    res.status(200).json({ success: true, data: updatedVendor });
  } catch (error) {
    console.error("Error updating vendor:", error); // Log the error
    next(error); // Pass the error to the errorHandler middleware
  }
};

exports.deleteVendor = async (req, res, next) => {
  try {
    const vendor = await vendorService.deleteVendor(req.params.id);
    if (!vendor) {
      throw new CustomError("Vendor not found or could not be deleted", 404);
    }
    res.status(204).send();
  } catch (error) {
    console.error("Error deleting vendor:", error); // Log the error
    next(error); // Pass the error to the errorHandler middleware
  }
};
