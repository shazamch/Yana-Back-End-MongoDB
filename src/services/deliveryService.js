const Delivery = require('../models/Delivery');

exports.createDelivery = async (deliveryData) => {
  return await Delivery.create(deliveryData);
};

exports.getAllDeliveries = async () => {
  return await Delivery.findAll();
};

exports.getDeliveryById = async (id) => {
  return await Delivery.findByPk(id);
};

exports.updateDelivery = async (id, deliveryData) => {
  await Delivery.update(deliveryData, { where: { DeliveryID: id } });
  return await Delivery.findByPk(id);
};

exports.deleteDelivery = async (id) => {
  return await Delivery.destroy({ where: { DeliveryID: id } });
};
