const complaintsService = require('../services/complaintsService');
const CustomError = require('../utils/CustomError');

exports.createComplaint = async (req, res, next) => {
  try {
    // Validate input
    if (!req.body.userId || !req.body.description) {
      throw new CustomError('User ID and description are required', 400);
    }

    const newComplaint = await complaintsService.createComplaint(req.body);
    res.status(201).json({ success: true, data: newComplaint });
  } catch (error) {
    next(error); // Pass error to the errorHandler middleware
  }
};

exports.getAllComplaints = async (req, res, next) => {
  try {
    const complaints = await complaintsService.getAllComplaints();
    res.status(200).json({ success: true, data: complaints });
  } catch (error) {
    next(error); // Pass error to the errorHandler middleware
  }
};

exports.getComplaintById = async (req, res, next) => {
  try {
    const complaint = await complaintsService.getComplaintById(req.params.id);
    if (!complaint) {
      throw new CustomError('Complaint not found', 404);
    }
    res.status(200).json({ success: true, data: complaint });
  } catch (error) {
    next(error); // Pass error to the errorHandler middleware
  }
};

exports.updateComplaint = async (req, res, next) => {
  try {
    const updatedComplaint = await complaintsService.updateComplaint(req.params.id, req.body);
    if (!updatedComplaint) {
      throw new CustomError('Complaint not found or could not be updated', 404);
    }
    res.status(200).json({ success: true, data: updatedComplaint });
  } catch (error) {
    next(error); // Pass error to the errorHandler middleware
  }
};

exports.deleteComplaint = async (req, res, next) => {
  try {
    const deleted = await complaintsService.deleteComplaint(req.params.id);
    if (!deleted) {
      throw new CustomError('Complaint not found or could not be deleted', 404);
    }
    res.status(204).end();
  } catch (error) {
    next(error); // Pass error to the errorHandler middleware
  }
};
