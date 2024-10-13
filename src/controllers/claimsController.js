const claimsService = require('../services/claimsService');
const CustomError = require('../utils/CustomError');

exports.createClaim = async (req, res, next) => {
  try {
    // Validate input
    if (!req.body.claimType || !req.body.policyNumber) {
      throw new CustomError('Claim type and policy number are required', 400);
    }

    const claim = await claimsService.createClaim(req.body);
    res.status(201).json({ success: true, data: claim });
  } catch (error) {
    next(error); // Pass error to the errorHandler middleware
  }
};

exports.getAllClaims = async (req, res, next) => {
  try {
    const claims = await claimsService.getAllClaims();
    res.status(200).json({ success: true, data: claims });
  } catch (error) {
    next(error); // Pass error to the errorHandler middleware
  }
};

exports.getClaimById = async (req, res, next) => {
  try {
    const claim = await claimsService.getClaimById(req.params.id);
    if (!claim) {
      throw new CustomError('Claim not found', 404);
    }
    res.status(200).json({ success: true, data: claim });
  } catch (error) {
    next(error); // Pass error to the errorHandler middleware
  }
};

exports.updateClaim = async (req, res, next) => {
  try {
    const updatedClaim = await claimsService.updateClaim(req.params.id, req.body);
    if (!updatedClaim) {
      throw new CustomError('Claim not found or could not be updated', 404);
    }
    res.status(200).json({ success: true, data: updatedClaim });
  } catch (error) {
    next(error); // Pass error to the errorHandler middleware
  }
};

exports.deleteClaim = async (req, res, next) => {
  try {
    const deleted = await claimsService.deleteClaim(req.params.id);
    if (!deleted) {
      throw new CustomError('Claim not found or could not be deleted', 404);
    }
    res.status(204).end();
  } catch (error) {
    next(error); // Pass error to the errorHandler middleware
  }
};
