const Disputes = require('../models/Disputes');

exports.createDispute = async (disputeData) => {
  return await Disputes.create(disputeData);
};

exports.getAllDisputes = async () => {
  return await Disputes.findAll();
};

exports.getDisputeById = async (id) => {
  return await Disputes.findByPk(id);
};

exports.updateDispute = async (id, disputeData) => {
  await Disputes.update(disputeData, { where: { DisputeID: id } });
  return await Disputes.findByPk(id);
};

exports.deleteDispute = async (id) => {
  return await Disputes.destroy({ where: { DisputeID: id } });
};
