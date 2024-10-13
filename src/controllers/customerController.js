const customerService = require('../services/customerService');
const CustomError = require('../utils/CustomError');

exports.createCustomer = async (req, res, next) => {
  try {
    // Validate input
    if (!req.body.name || !req.body.email) {
      throw new CustomError('Name and email are required', 400);
    }

    const newCustomer = await customerService.createCustomer(req.body);
    res.status(201).json({ success: true, data: newCustomer });
  } catch (error) {
    next(error); // Pass error to the errorHandler middleware
  }
};

exports.getAllCustomers = async (req, res, next) => {
  try {
    const customers = await customerService.getAllCustomers();
    res.status(200).json({ success: true, data: customers });
  } catch (error) {
    next(error); // Pass error to the errorHandler middleware
  }
};

exports.getCustomerById = async (req, res, next) => {
  try {
    const customer = await customerService.getCustomerById(req.params.id);
    if (!customer) {
      throw new CustomError('Customer not found', 404);
    }
    res.status(200).json({ success: true, data: customer });
  } catch (error) {
    next(error); // Pass error to the errorHandler middleware
  }
};

exports.updateCustomer = async (req, res, next) => {
  try {
    const updatedCustomer = await customerService.updateCustomer(req.params.id, req.body);
    if (!updatedCustomer) {
      throw new CustomError('Customer not found or could not be updated', 404);
    }
    res.status(200).json({ success: true, data: updatedCustomer });
  } catch (error) {
    next(error); // Pass error to the errorHandler middleware
  }
};

exports.deleteCustomer = async (req, res, next) => {
  try {
    const deleted = await customerService.deleteCustomer(req.params.id);
    if (!deleted) {
      throw new CustomError('Customer not found or could not be deleted', 404);
    }
    res.status(204).end();
  } catch (error) {
    next(error); // Pass error to the errorHandler middleware
  }
};


exports.updateAllData = async (req, res, next) => {
  try {
    const { customerId } = req.params;  
    const CustomerData = req.body
      const insuranceData = CustomerData.Insurance
      const coordinatorData = CustomerData.Coordinator
      console.log(req.body)
      // Ensure that at least some data is provided for update
      if (!CustomerData && !insuranceData && !coordinatorData) {
          return res.status(400).json({
              success: false,
              message: 'No data provided for update'
          });
      }

      // Call the service to update Customer, Coordinator, and Insurance
      const result = await customerService.updateCustomerWithCoordinatorAndInsuranceCheck(
        customerId, CustomerData, insuranceData, coordinatorData
      );

      res.status(200).json({ 
          success: true, 
          message: 'Data updated successfully',
          data: result
      });
  } catch (error) {
      res.status(500).json({
          success: false,
          message: error.message || 'Error updating customer data'
      });
      next(error);
  }
};