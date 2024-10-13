const PotentialCustomer = require('../models/PotentialCustomer');
const CustomError = require('../utils/CustomError');

// Function to add a new potential customer
const addPotentialCustomer = async (customerData) => {
  try {
    // Check if the potential customer already exists
    const existingCustomer = await PotentialCustomer.findOne({ MemberID: customerData.MemberID });

    if (existingCustomer) {
      throw new CustomError('Potential customer with this MemberID already exists', 400);
    }

    // Create a new potential customer
    const newCustomer = await PotentialCustomer.create(customerData);
    return newCustomer;
  } catch (error) {
    throw new CustomError(`Error adding potential customer: ${error.message}`, 500);
  }
};

// Function to get all potential customers
const getAllPotentialCustomers = async () => {
  try {
    const customers = await PotentialCustomer.find({});
    return customers;
  } catch (error) {
    throw new CustomError(`Error fetching potential customers: ${error.message}`, 500);
  }
};

// Function to approve a potential customer and move them to the main Customer table
const approvePotentialCustomer = async (PotentialCustomerID) => {
  try {
    // Find the potential customer by ID
    const potentialCustomer = await PotentialCustomer.findById(PotentialCustomerID);

    if (!potentialCustomer) {
      throw new CustomError('Potential customer not found', 404);
    }

    // Move the potential customer to the Customer table
    const newCustomer = await Customer.create({
      MemberID: potentialCustomer.MemberID,
      Name: potentialCustomer.Name,
      MedicaidID: potentialCustomer.MedicaidID,
      Phone: potentialCustomer.Phone,
      Address: potentialCustomer.Address,
      MemberDOB: potentialCustomer.MemberDOB,
      Status: 'Active', // Set status to Active upon approval
    });

    // Delete the entry from the PotentialCustomers table
    await PotentialCustomer.deleteOne({ _id: PotentialCustomerID });

    return newCustomer;
  } catch (error) {
    throw new CustomError(`Error approving potential customer: ${error.message}`, 500);
  }
};

// Function to reject a potential customer
const rejectPotentialCustomer = async (PotentialCustomerID) => {
  try {
    const potentialCustomer = await PotentialCustomer.findById(PotentialCustomerID);

    if (!potentialCustomer) {
      throw new CustomError('Potential customer not found', 404);
    }

    // Delete the entry from the PotentialCustomers table
    await PotentialCustomer.deleteOne({ _id: PotentialCustomerID });

    return { message: 'Potential customer rejected and removed' };
  } catch (error) {
    throw new CustomError(`Error rejecting potential customer: ${error.message}`, 500);
  }
};

// Function to update an existing potential customer
const updatePotentialCustomer = async (PotentialCustomerID, updatedData) => {
  try {
    // Find the potential customer by ID
    const potentialCustomer = await PotentialCustomer.findById(PotentialCustomerID);

    if (!potentialCustomer) {
      throw new CustomError('Potential customer not found', 404);
    }

    // Update the customer with the new data
    const updatedCustomer = await PotentialCustomer.findByIdAndUpdate(
      PotentialCustomerID,
      updatedData,
      { new: true } // Return the updated document
    );

    return updatedCustomer;
  } catch (error) {
    throw new CustomError(`Error updating potential customer: ${error.message}`, 500);
  }
};

// Function to get a potential customer by ID
const getCustomerById = async (id) => {
  try {
    const potentialCustomer = await PotentialCustomer.findById(id);
    if (!potentialCustomer) {
      throw new CustomError('Potential customer not found', 404);
    }
    return potentialCustomer;
  } catch (error) {
    throw new CustomError(`Error retrieving potential customer: ${error.message}`, 500);
  }
};

module.exports = {
  addPotentialCustomer,
  getAllPotentialCustomers,
  approvePotentialCustomer,
  rejectPotentialCustomer,
  updatePotentialCustomer,
  getCustomerById,
};
