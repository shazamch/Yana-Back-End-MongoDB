const Customer = require('../models/Customer');
const Insurance = require('../models/Insurance');
const Coordinator = require('../models/Coordinator');

exports.createCustomer = async (customerData) => {
  try {
    const newCustomer = await Customer.create(customerData);
    return newCustomer;
  } catch (error) {
    throw new Error('Error creating customer: ' + error.message);
  }
};

exports.getAllCustomers = async () => {
  try {
    // Fetch all customers with populated fields
    const customers = await Customer.find()
      .populate({ path: 'CoordinatorID', model: 'Coordinator' }) // No need for 'as' since we're directly populating
      .populate({ path: 'InsuranceID', model: 'Insurance' });

    // Check if customers were found
    if (!customers || customers.length === 0) {
      throw new Error('No customers found');
    }

    // Iterate through each customer to restructure the data
    const updatedCustomers = customers.map(customer => {
      // Create a copy of the customer
      const updatedCustomer = { ...customer.toObject() }; // Convert mongoose document to plain object

      // Assign populated fields to new keys
      updatedCustomer.Coordinator = updatedCustomer.CoordinatorID;
      updatedCustomer.Insurance = updatedCustomer.InsuranceID;

      // Remove the old fields
      delete updatedCustomer.CoordinatorID;
      delete updatedCustomer.InsuranceID;

      return updatedCustomer; // Return updated customer object
    });

    return updatedCustomers; // Return the array of updated customers
  } catch (error) {
    throw new Error('Error retrieving customers: ' + error.message);
  }
};


exports.getCustomerById = async (id) => {
  try {
    const customer = await Customer.findById(id).populate('Coordinator').populate('Insurance');
    if (!customer) {
      throw new Error('Customer not found');
    }
    return customer;
  } catch (error) {
    throw new Error('Error retrieving customer: ' + error.message);
  }
};

exports.updateCustomer = async (id, customerData) => {
  try {
    const customer = await Customer.findById(id);
    if (!customer) {
      throw new Error('Customer not found');
    }
    Object.assign(customer, customerData); // Update customer fields
    await customer.save();
    return customer;
  } catch (error) {
    throw new Error('Error updating customer: ' + error.message);
  }
};

exports.deleteCustomer = async (id) => {
  try {
    const customer = await Customer.findById(id);
    if (!customer) {
      throw new Error('Customer not found');
    }
    await customer.remove(); // Use remove method for Mongoose
    return;
  } catch (error) {
    throw new Error('Error deleting customer: ' + error.message);
  }
};

exports.getCustomerByUsername = async (username) => {
  try {
    const customer = await Customer.findOne({ Username: username }).populate('Coordinator').populate('Insurance');
    return customer;
  } catch (error) {
    throw new Error('Error retrieving customer by username: ' + error.message);
  }
};

exports.updateCustomerWithCoordinatorAndInsuranceCheck = async (CustomerID, CustomerData, insuranceData, coordinatorData) => {
  try {
    const customer = await Customer.findById(CustomerID)
          .populate({ path: 'CoordinatorID', model: 'Coordinator', as: 'Coordinator' }) // Use an alias in populate
          .populate({ path: 'InsuranceID', model: 'Insurance', as: 'Insurance' });

      // Check if the potential customer exists
      if (customer) {
        customer.Coordinator = customer.CoordinatorID;
        customer.Insurance = customer.InsuranceID;
          
          // Remove the old fields
          delete customer.CoordinatorID;
          delete customer.InsuranceID;
      } else {
          throw new Error('Potential customer not found');
      }

    // Get existing coordinator data and ignore CoordinatorID
    const existingCoordinatorData = customer.Coordinator;
    const areCoordinatorsSame = Object.keys(coordinatorData).every(key => 
      existingCoordinatorData[key] === coordinatorData[key]
    );

    const existingInsuranceData = customer.Insurance;
    const areInsurancesSame = Object.keys(insuranceData).every(key => 
      existingInsuranceData[key] === insuranceData[key]
    );

    if (areCoordinatorsSame && areInsurancesSame) {
      // Update Customer excluding Coordinator and Insurance
      Object.assign(customer, CustomerData);
      await customer.save();
    } else {
      if (!areCoordinatorsSame) {
        const existingCoordinator = await Coordinator.findOne({
          Name: coordinatorData.Name,
          Phone: coordinatorData.Phone,
          Email: coordinatorData.Email
        });

        if (existingCoordinator) {
          customer.CoordinatorID = existingCoordinator._id; // Set existing Coordinator ID
        } else {
          const newCoordinator = await Coordinator.create(coordinatorData);
          customer.CoordinatorID = newCoordinator._id; // Set new Coordinator ID
        }
      }

      if (!areInsurancesSame) {
        const existingInsurance = await Insurance.findOne({
          AuthUnitsApproved: insuranceData.AuthUnitsApproved,
          CPT: insuranceData.CPT,
          Frequency: insuranceData.Frequency,
          Note: insuranceData.Note
        });

        if (existingInsurance) {
          customer.InsuranceID = existingInsurance._id; // Set existing Insurance ID
        } else {
          const newInsurance = await Insurance.create(insuranceData);
          customer.InsuranceID = newInsurance._id; // Set new Insurance ID
        }
      }

      Object.assign(customer, CustomerData);
      await customer.save();
    }
  } catch (error) {
    console.error("Error details:", error); // Log the error object
    throw new Error(`Error updating customer data: ${error.message}`);
  }
};
