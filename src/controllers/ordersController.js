const ordersService = require('../services/ordersService');
const CustomError = require('../utils/CustomError');

exports.createOrder = async (req, res, next) => {
  try {
    const newOrder = await ordersService.createOrder(req.body);
    res.status(201).json({ success: true, data: newOrder });
  } catch (error) {
    next(error); // Pass error to the errorHandler middleware
  }
};

exports.getAllOrders = async (req, res, next) => {
  try {
    const orders = await ordersService.getAllOrders();
    res.status(200).json({ success: true, data: orders });
  } catch (error) {
    next(error); // Pass error to the errorHandler middleware
  }
};

exports.getOrderById = async (req, res, next) => {
  try {
    const order = await ordersService.getOrderById(req.params.id);
    if (!order) {
      throw new CustomError('Order not found', 404);
    }
    res.status(200).json({ success: true, data: order });
  } catch (error) {
    next(error); // Pass error to the errorHandler middleware
  }
};

exports.updateOrder = async (req, res, next) => {
  try {
    const updatedOrder = await ordersService.updateOrder(req.params.id, req.body);
    if (!updatedOrder) {
      throw new CustomError('Order not found or could not be updated', 404);
    }
    res.status(200).json({ success: true, data: updatedOrder });
  } catch (error) {
    next(error); // Pass error to the errorHandler middleware
  }
};

exports.deleteOrder = async (req, res, next) => {
  try {
    const deleted = await ordersService.deleteOrder(req.params.id);
    if (!deleted) {
      throw new CustomError('Order not found or could not be deleted', 404);
    }
    res.status(204).end();
  } catch (error) {
    next(error); // Pass error to the errorHandler middleware
  }
};
