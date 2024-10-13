// controllers/potentialCustomerController.js

const potentialCustomerService = require('../services/potentialCustomerService');
const ApiResponse = require('../utils/ApiResponse');
const CustomError = require('../utils/CustomError');

// Controller to add a new potential customer
exports.addPotentialCustomer = async (req, res, next) => {
  try {
    const newCustomer = await potentialCustomerService.addPotentialCustomer(req.body);
    res.status(201).json(new ApiResponse(201, newCustomer, 'Potential customer added successfully').toJSON());
  } catch (error) {
    next(new CustomError(error.message, error.statusCode || 500));
  }
};

// Controller to get all potential customers
exports.getAllPotentialCustomers = async (req, res, next) => {
  try {
    const customers = await potentialCustomerService.getAllPotentialCustomers();
    res.status(200).json(new ApiResponse(200, customers, 'Potential customers retrieved successfully').toJSON());
  } catch (error) {
    next(new CustomError(error.message, error.statusCode || 500));
  }
};

// Controller to approve a potential customer
exports.approvePotentialCustomer = async (req, res, next) => {
  try {
    const { PotentialCustomerID } = req.params;
    const newCustomer = await potentialCustomerService.approvePotentialCustomer(PotentialCustomerID, req.models.Customer);
    res.status(200).json(new ApiResponse(200, newCustomer, 'Potential customer approved and moved to customers').toJSON());
  } catch (error) {
    next(new CustomError(error.message, error.statusCode || 500));
  }
};

// Controller to reject a potential customer
exports.rejectPotentialCustomer = async (req, res, next) => {
  try {
    const { PotentialCustomerID } = req.params;
    const result = await potentialCustomerService.rejectPotentialCustomer(PotentialCustomerID);
    res.status(200).json(new ApiResponse(200, result, 'Potential customer rejected and removed').toJSON());
  } catch (error) {
    next(new CustomError(error.message, error.statusCode || 500));
  }
};
