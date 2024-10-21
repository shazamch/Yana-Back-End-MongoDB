const Complaints = require('../models/Complaints');

exports.createComplaint = async (complaintData) => {
  try {
    const newComplaint = await Complaints.create(complaintData);
    return newComplaint;
  } catch (error) {
    throw new Error('Error creating complaint: ' + error.message);
  }
};

exports.getAllComplaints = async () => {
  try {
    const complaints = await Complaints.find();
    return complaints;
  } catch (error) {
    throw new Error('Error retrieving complaints: ' + error.message);
  }
};

exports.getComplaintById = async (id) => {
  try {
    const complaint = await Complaints.findById(id);
    if (!complaint) {
      throw new Error('Complaint not found');
    }
    return complaint;
  } catch (error) {
    throw new Error('Error retrieving complaint: ' + error.message);
  }
};

exports.updateComplaint = async (id, complaintData) => {
  try {
    const complaint = await Complaints.findById(id);
    if (!complaint) {
      throw new Error('Complaint not found');
    }
    await complaint.updateOne(complaintData);
    return await Complaints.findById(id);
  } catch (error) {
    throw new Error('Error updating complaint: ' + error.message);
  }
};

exports.deleteComplaint = async (id) => {
  try {
    const complaint = await Complaints.findById(id);
    if (!complaint) {
      throw new Error('Complaint not found');
    }
    await complaint.deleteOne();
    return;
  } catch (error) {
    throw new Error('Error deleting complaint: ' + error.message);
  }
};
