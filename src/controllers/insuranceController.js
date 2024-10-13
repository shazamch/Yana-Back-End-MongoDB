const insuranceService = require('../services/insuranceService');
const CustomError = require('../utils/CustomError');

exports.createInsurance = async (req, res, next) => {
  try {
    // Validate input
    if (!req.body.policyNumber || !req.body.type) {
      throw new CustomError('Policy number and type are required', 400);
    }

    const newInsurance = await insuranceService.createInsurance(req.body);
    res.status(201).json({ success: true, data: newInsurance });
  } catch (error) {
    next(error); // Pass error to the errorHandler middleware
  }
};

exports.getAllInsurance = async (req, res, next) => {
  try {
    const insurances = await insuranceService.getAllInsurance();
    res.status(200).json({ success: true, data: insurances });
  } catch (error) {
    next(error); // Pass error to the errorHandler middleware
  }
};

exports.getInsuranceById = async (req, res, next) => {
  try {
    const insurance = await insuranceService.getInsuranceById(req.params.id);
    if (!insurance) {
      throw new CustomError('Insurance not found', 404);
    }
    res.status(200).json({ success: true, data: insurance });
  } catch (error) {
    next(error); // Pass error to the errorHandler middleware
  }
};

exports.updateInsurance = async (req, res, next) => {
  try {
    const updatedInsurance = await insuranceService.updateInsurance(req.params.id, req.body);
    if (!updatedInsurance) {
      throw new CustomError('Insurance not found or could not be updated', 404);
    }
    res.status(200).json({ success: true, data: updatedInsurance });
  } catch (error) {
    next(error); // Pass error to the errorHandler middleware
  }
};

exports.deleteInsurance = async (req, res, next) => {
  try {
    const deleted = await insuranceService.deleteInsurance(req.params.id);
    if (!deleted) {
      throw new CustomError('Insurance not found or could not be deleted', 404);
    }
    res.status(204).end();
  } catch (error) {
    next(error); // Pass error to the errorHandler middleware
  }
};
