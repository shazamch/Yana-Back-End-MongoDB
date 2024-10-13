const path = require('path');
const { compareAndUpdate } = require('../services/naviNetService');
const ApiResponse = require('../utils/ApiResponse');
const CustomError = require('../utils/CustomError');

exports.uploadAndCompare = async (req, res, next) => {
  try {
    // Check if the file was uploaded
    if (!req.file) {
      throw new CustomError('No file uploaded', 400);
    }

    // Determine the file path
    const filePath = path.join(__dirname, '../../', req.file.path);

    // Use the service to compare and update customer data
    const { updatedCustomers, newPotentialCustomers } = await compareAndUpdate(filePath);

    // Handle response for no changes detected
    if (!updatedCustomers.length && !newPotentialCustomers.length) {
      return res.status(200).json(new ApiResponse(200, {}, 'No changes were detected'));
    }

    // Send the response with the list of updated customers and new potential customers
    res.status(200).json(new ApiResponse(200, { updatedCustomers, newPotentialCustomers }, 'File processed and customers flagged successfully'));

  } catch (error) {
    // Handle any unexpected errors gracefully
    console.error(`Error in uploadAndCompare: ${error.message}`);
    next(new CustomError(error.message, 500));
  }
};
