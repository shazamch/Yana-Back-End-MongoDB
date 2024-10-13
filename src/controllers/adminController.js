const adminService = require('../services/adminService');
const CustomError = require('../utils/CustomError');

exports.createAdmin = async (req, res, next) => {
  try {
    // Validate input
    if (!req.body.username || !req.body.email) {
      throw new CustomError('Username and email are required', 400);
    }

    const newAdmin = await adminService.createAdmin(req.body);
    res.status(201).json({ success: true, data: newAdmin });
  } catch (error) {
    next(error); // Pass error to the errorHandler middleware
  }
};

exports.getAllAdmins = async (req, res, next) => {
  try {
    const admins = await adminService.getAllAdmins();
    res.status(200).json({ success: true, data: admins });
  } catch (error) {
    next(error); // Pass error to the errorHandler middleware
  }
};

exports.getAdminById = async (req, res, next) => {
  try {
    const admin = await adminService.getAdminById(req.params.id);
    if (!admin) {
      throw new CustomError('Admin not found', 404);
    }
    res.status(200).json({ success: true, data: admin });
  } catch (error) {
    next(error); // Pass error to the errorHandler middleware
  }
};

exports.updateAdmin = async (req, res, next) => {
  try {
    const updatedAdmin = await adminService.updateAdmin(req.params.id, req.body);
    if (!updatedAdmin) {
      throw new CustomError('Admin not found or could not be updated', 404);
    }
    res.status(200).json({ success: true, data: updatedAdmin });
  } catch (error) {
    next(error); // Pass error to the errorHandler middleware
  }
};

exports.deleteAdmin = async (req, res, next) => {
  try {
    const deleted = await adminService.deleteAdmin(req.params.id);
    if (!deleted) {
      throw new CustomError('Admin not found or could not be deleted', 404);
    }
    res.status(204).end();
  } catch (error) {
    next(error); // Pass error to the errorHandler middleware
  }
};
