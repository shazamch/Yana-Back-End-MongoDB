const deliveryService = require('../services/deliveryService');
const CustomError = require('../utils/CustomError');

exports.createDelivery = async (req, res, next) => {
  try {
    // Validate input
    if (!req.body.orderId || !req.body.address) {
      throw new CustomError('Order ID and address are required', 400);
    }

    const delivery = await deliveryService.createDelivery(req.body);
    res.status(201).json({ success: true, data: delivery });
  } catch (error) {
    next(error); // Pass error to the errorHandler middleware
  }
};

exports.getAllDeliveries = async (req, res, next) => {
  try {
    const deliveries = await deliveryService.getAllDeliveries();
    res.status(200).json({ success: true, data: deliveries });
  } catch (error) {
    next(error); // Pass error to the errorHandler middleware
  }
};

exports.getDeliveryById = async (req, res, next) => {
  try {
    const delivery = await deliveryService.getDeliveryById(req.params.id);
    if (!delivery) {
      throw new CustomError('Delivery not found', 404);
    }
    res.status(200).json({ success: true, data: delivery });
  } catch (error) {
    next(error); // Pass error to the errorHandler middleware
  }
};

exports.updateDelivery = async (req, res, next) => {
  try {
    const updatedDelivery = await deliveryService.updateDelivery(req.params.id, req.body);
    if (!updatedDelivery) {
      throw new CustomError('Delivery not found or could not be updated', 404);
    }
    res.status(200).json({ success: true, data: updatedDelivery });
  } catch (error) {
    next(error); // Pass error to the errorHandler middleware
  }
};

exports.deleteDelivery = async (req, res, next) => {
  try {
    const deleted = await deliveryService.deleteDelivery(req.params.id);
    if (!deleted) {
      throw new CustomError('Delivery not found or could not be deleted', 404);
    }
    res.status(204).end();
  } catch (error) {
    next(error); // Pass error to the errorHandler middleware
  }
};
