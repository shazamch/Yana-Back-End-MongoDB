const Insurance = require('../models/Insurance');
const CustomError = require('../utils/CustomError');

exports.createInsurance = async (insuranceData) => {
  try {
    const newInsurance = await Insurance.create(insuranceData);
    return newInsurance;
  } catch (error) {
    throw new CustomError('Error creating insurance: ' + error.message, 500);
  }
};

exports.getAllInsurance = async () => {
  try {
    const insurances = await Insurance.findAll();
    return insurances;
  } catch (error) {
    throw new CustomError('Error retrieving insurances: ' + error.message, 500);
  }
};

exports.getInsuranceById = async (id) => {
  try {
    const insurance = await Insurance.findByPk(id);
    if (!insurance) {
      throw new CustomError('Insurance not found', 404);
    }
    return insurance;
  } catch (error) {
    throw new CustomError('Error retrieving insurance: ' + error.message, 500);
  }
};

exports.updateInsurance = async (id, insuranceData) => {
  try {
    const insurance = await Insurance.findByPk(id);
    if (!insurance) {
      throw new CustomError('Insurance not found', 404);
    }
    await insurance.update(insuranceData);
    return insurance;
  } catch (error) {
    throw new CustomError('Error updating insurance: ' + error.message, 500);
  }
};

exports.deleteInsurance = async (id) => {
  try {
    const insurance = await Insurance.findByPk(id);
    if (!insurance) {
      throw new CustomError('Insurance not found', 404);
    }
    await insurance.destroy();
    return { message: 'Insurance deleted successfully' }; // Return a success message
  } catch (error) {
    throw new CustomError('Error deleting insurance: ' + error.message, 500);
  }
};
