const Riders = require('../models/Riders');

exports.createRider = async (riderData) => {
  return await Riders.create(riderData);
};

exports.getAllRiders = async () => {
  return await Riders.findAll();
};

exports.getRiderById = async (id) => {
  return await Riders.findByPk(id);
};

exports.updateRider = async (id, riderData) => {
  await Riders.update(riderData, { where: { RiderID: id } });
  return await Riders.findByPk(id);
};

exports.deleteRider = async (id) => {
  return await Riders.destroy({ where: { RiderID: id } });
};
