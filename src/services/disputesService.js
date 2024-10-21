const Disputes = require('../models/Disputes');

exports.createDispute = async (disputeData) => {
  try {
    const newDispute = await Disputes.create(disputeData);
    return newDispute;
  } catch (error) {
    throw new Error('Error creating dispute: ' + error.message);
  }
};

exports.getAllDisputes = async () => {
  try {
    const disputes = await Disputes.find();
    return disputes;
  } catch (error) {
    throw new Error('Error retrieving disputes: ' + error.message);
  }
};

exports.getDisputeById = async (id) => {
  try {
    const dispute = await Disputes.findById(id);
    if (!dispute) {
      throw new Error('Dispute not found');
    }
    return dispute;
  } catch (error) {
    throw new Error('Error retrieving dispute: ' + error.message);
  }
};

exports.updateDispute = async (id, disputeData) => {
  try {
    const updatedDispute = await Disputes.findByIdAndUpdate(id, disputeData, { new: true });
    if (!updatedDispute) {
      throw new Error('Dispute not found');
    }
    return updatedDispute;
  } catch (error) {
    throw new Error('Error updating dispute: ' + error.message);
  }
};

exports.deleteDispute = async (id) => {
  try {
    const deletedDispute = await Disputes.findByIdAndDelete(id);
    if (!deletedDispute) {
      throw new Error('Dispute not found');
    }
    return deletedDispute;
  } catch (error) {
    throw new Error('Error deleting dispute: ' + error.message);
  }
};
