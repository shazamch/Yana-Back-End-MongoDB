const disputesService = require('../services/disputesService');
const CustomError = require('../utils/CustomError');

exports.createDispute = async (req, res, next) => {
  try {
    // Validate input
    if (!req.body.orderId || !req.body.reason) {
      throw new CustomError('Order ID and reason are required', 400);
    }

    const dispute = await disputesService.createDispute(req.body);
    res.status(201).json({ success: true, data: dispute });
  } catch (error) {
    next(error); // Pass error to the errorHandler middleware
  }
};

exports.getAllDisputes = async (req, res, next) => {
  try {
    const disputes = await disputesService.getAllDisputes();
    res.status(200).json({ success: true, data: disputes });
  } catch (error) {
    next(error); // Pass error to the errorHandler middleware
  }
};

exports.getDisputeById = async (req, res, next) => {
  try {
    const dispute = await disputesService.getDisputeById(req.params.id);
    if (!dispute) {
      throw new CustomError('Dispute not found', 404);
    }
    res.status(200).json({ success: true, data: dispute });
  } catch (error) {
    next(error); // Pass error to the errorHandler middleware
  }
};

exports.updateDispute = async (req, res, next) => {
  try {
    const updatedDispute = await disputesService.updateDispute(req.params.id, req.body);
    if (!updatedDispute) {
      throw new CustomError('Dispute not found or could not be updated', 404);
    }
    res.status(200).json({ success: true, data: updatedDispute });
  } catch (error) {
    next(error); // Pass error to the errorHandler middleware
  }
};

exports.deleteDispute = async (req, res, next) => {
  try {
    const deleted = await disputesService.deleteDispute(req.params.id);
    if (!deleted) {
      throw new CustomError('Dispute not found or could not be deleted', 404);
    }
    res.status(204).end();
  } catch (error) {
    next(error); // Pass error to the errorHandler middleware
  }
};
