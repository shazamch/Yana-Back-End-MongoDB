const repeatOrderService = require('../services/repeatOrderService');
const CustomError = require('../utils/CustomError');

exports.createRepeatOrder = async (req, res, next) => {
  try {
    // Validate input
    if (!req.body.orderId || !req.body.userId) {
      throw new CustomError('Order ID and User ID are required', 400);
    }

    const newRepeatOrder = await repeatOrderService.createRepeatOrder(req.body);
    res.status(201).json({ success: true, data: newRepeatOrder });
  } catch (error) {
    next(error); // Pass error to the errorHandler middleware
  }
};

exports.getAllRepeatOrders = async (req, res, next) => {
  try {
    const repeatOrders = await repeatOrderService.getAllRepeatOrders();
    res.status(200).json({ success: true, data: repeatOrders });
  } catch (error) {
    next(error); // Pass error to the errorHandler middleware
  }
};

exports.getRepeatOrderById = async (req, res, next) => {
  try {
    const repeatOrder = await repeatOrderService.getRepeatOrderById(req.params.id);
    if (!repeatOrder) {
      throw new CustomError('Repeat order not found', 404);
    }
    res.status(200).json({ success: true, data: repeatOrder });
  } catch (error) {
    next(error); // Pass error to the errorHandler middleware
  }
};

exports.updateRepeatOrder = async (req, res, next) => {
  try {
    const updatedRepeatOrder = await repeatOrderService.updateRepeatOrder(req.params.id, req.body);
    if (!updatedRepeatOrder) {
      throw new CustomError('Repeat order not found or could not be updated', 404);
    }
    res.status(200).json({ success: true, data: updatedRepeatOrder });
  } catch (error) {
    next(error); // Pass error to the errorHandler middleware
  }
};

exports.deleteRepeatOrder = async (req, res, next) => {
  try {
    const deleted = await repeatOrderService.deleteRepeatOrder(req.params.id);
    if (!deleted) {
      throw new CustomError('Repeat order not found or could not be deleted', 404);
    }
    res.status(204).end();
  } catch (error) {
    next(error); // Pass error to the errorHandler middleware
  }
};
