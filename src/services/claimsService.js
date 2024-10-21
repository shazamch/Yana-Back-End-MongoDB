const Claims = require('../models/Claims');

exports.createClaim = async (claimData) => {
  try {
    const newClaim = await Claims.create(claimData);
    return newClaim;
  } catch (error) {
    throw new Error('Error creating claim: ' + error.message);
  }
};

exports.getAllClaims = async () => {
  try {
    const claims = await Claims.find();
    return claims;
  } catch (error) {
    throw new Error('Error retrieving claims: ' + error.message);
  }
};

exports.getClaimById = async (id) => {
  try {
    const claim = await Claims.findById(id);
    if (!claim) {
      throw new Error('Claim not found');
    }
    return claim;
  } catch (error) {
    throw new Error('Error retrieving claim: ' + error.message);
  }
};

exports.updateClaim = async (id, claimData) => {
  try {
    const updatedClaim = await Claims.findByIdAndUpdate(id, claimData, { new: true });
    if (!updatedClaim) {
      throw new Error('Claim not found');
    }
    return updatedClaim;
  } catch (error) {
    throw new Error('Error updating claim: ' + error.message);
  }
};

exports.deleteClaim = async (id) => {
  try {
    const deletedClaim = await Claims.findByIdAndDelete(id);
    if (!deletedClaim) {
      throw new Error('Claim not found');
    }
    return deletedClaim;
  } catch (error) {
    throw new Error('Error deleting claim: ' + error.message);
  }
};
