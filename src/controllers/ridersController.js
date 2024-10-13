const ridersService = require('../services/ridersService');
const CustomError = require('../utils/CustomError');

exports.createRider = async (req, res, next) => {
  try {
    // Validate input
    if (!req.body.name || !req.body.phone) {
      throw new CustomError('Name and phone number are required', 400);
    }

    const rider = await ridersService.createRider(req.body);
    res.status(201).json({ success: true, data: rider });
  } catch (error) {
    next(error); // Pass error to the errorHandler middleware
  }
};

exports.getAllRiders = async (req, res, next) => {
  try {
    const riders = await ridersService.getAllRiders();
    res.status(200).json({ success: true, data: riders });
  } catch (error) {
    next(error); // Pass error to the errorHandler middleware
  }
};

exports.getRiderById = async (req, res, next) => {
  try {
    const rider = await ridersService.getRiderById(req.params.id);
    if (!rider) {
      throw new CustomError('Rider not found', 404);
    }
    res.status(200).json({ success: true, data: rider });
  } catch (error) {
    next(error); // Pass error to the errorHandler middleware
  }
};

exports.updateRider = async (req, res, next) => {
  try {
    const updatedRider = await ridersService.updateRider(req.params.id, req.body);
    if (!updatedRider) {
      throw new CustomError('Rider not found or could not be updated', 404);
    }
    res.status(200).json({ success: true, data: updatedRider });
  } catch (error) {
    next(error); // Pass error to the errorHandler middleware
  }
};

exports.deleteRider = async (req, res, next) => {
  try {
    const deleted = await ridersService.deleteRider(req.params.id);
    if (!deleted) {
      throw new CustomError('Rider not found or could not be deleted', 404);
    }
    res.status(204).end();
  } catch (error) {
    next(error); // Pass error to the errorHandler middleware
  }
};
