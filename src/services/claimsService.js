const Claims = require('../models/Claims');

exports.createClaim = async (claimData) => {
  return await Claims.create(claimData);
};

exports.getAllClaims = async () => {
  return await Claims.findAll();
};

exports.getClaimById = async (id) => {
  return await Claims.findByPk(id);
};

exports.updateClaim = async (id, claimData) => {
  await Claims.update(claimData, { where: { ClaimID: id } });
  return await Claims.findByPk(id);
};

exports.deleteClaim = async (id) => {
  return await Claims.destroy({ where: { ClaimID: id } });
};
