const cartService = require('../services/cartService');
const CustomError = require('../utils/CustomError');

exports.addToCart = async (req, res, next) => {
  try {
    // Validate input
    if (!req.body.productId || !req.body.quantity) {
      throw new CustomError('Product ID and quantity are required', 400);
    }

    const newCartItem = await cartService.addToCart(req.body);
    res.status(201).json({ success: true, data: newCartItem });
  } catch (error) {
    next(error); // Pass error to the errorHandler middleware
  }
};

exports.getAllCartItems = async (req, res, next) => {
  try {
    const cartItems = await cartService.getAllCartItems();
    res.status(200).json({ success: true, data: cartItems });
  } catch (error) {
    next(error); // Pass error to the errorHandler middleware
  }
};

exports.getCartItemById = async (req, res, next) => {
  try {
    const cartItem = await cartService.getCartItemById(req.params.id);
    if (!cartItem) {
      throw new CustomError('Cart item not found', 404);
    }
    res.status(200).json({ success: true, data: cartItem });
  } catch (error) {
    next(error); // Pass error to the errorHandler middleware
  }
};

exports.updateCartItem = async (req, res, next) => {
  try {
    const updatedCartItem = await cartService.updateCartItem(req.params.id, req.body);
    if (!updatedCartItem) {
      throw new CustomError('Cart item not found or could not be updated', 404);
    }
    res.status(200).json({ success: true, data: updatedCartItem });
  } catch (error) {
    next(error); // Pass error to the errorHandler middleware
  }
};

exports.deleteCartItem = async (req, res, next) => {
  try {
    const deleted = await cartService.deleteCartItem(req.params.id);
    if (!deleted) {
      throw new CustomError('Cart item not found or could not be deleted', 404);
    }
    res.status(204).end();
  } catch (error) {
    next(error); // Pass error to the errorHandler middleware
  }
};
