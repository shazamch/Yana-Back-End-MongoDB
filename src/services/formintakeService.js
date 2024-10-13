const PotentialCustomer = require('../models/PotentialCustomer');
const Insurance = require('../models/Insurance');
const Coordinator = require('../models/Coordinator');

// Function to get all potential customers, including related Coordinator and Insurance data
const getAllCustomers = async () => {
    try {
        // Use `populate` to include related Coordinator and Insurance data
        const allpotentialCustomers = await PotentialCustomer.find()
            .populate({ path: 'CoordinatorID', model: 'Coordinator', as: 'Coordinator' }) // Use an alias in populate
            .populate({ path: 'InsuranceID', model: 'Insurance', as: 'Insurance' });
        const formattedCustomers = allpotentialCustomers.map(customer => {
            const customerObject = customer.toObject(); // Convert to plain JS object
            
            // Rename fields
            customerObject.Coordinator = customerObject.CoordinatorID;
            customerObject.Insurance = customerObject.InsuranceID;
            
            // Remove the old fields
            delete customerObject.CoordinatorID;
            delete customerObject.InsuranceID;
            
            return customerObject;
            });
        return {
            allpotentialCustomers : formattedCustomers
        };
    } catch (error) {
        throw new Error(`Error fetching full customer data: ${error.message}`);
    }
};

// Function to fetch full data for a specific customer (including Coordinator and Insurance)
const getFullCustomerData = async (customerId) => {
    try {
        const customerData = await PotentialCustomer.findById(customerId).populate(['coordinator', 'insurance']);

        if (!customerData) {
            throw new Error('Potential customer not found');
        }

        return {
            potentialCustomer: customerData,
            coordinator: customerData.coordinator,
            insurance: customerData.insurance
        };
    } catch (error) {
        throw new Error(`Error fetching full customer data: ${error.message}`);
    }
};

// Function to fetch a specific PotentialCustomer by ID
const getPotentialCustomer = async (customerId) => {
    try {
        const customerData = await PotentialCustomer.findById(customerId);

        if (!customerData) {
            throw new Error('Potential customer not found');
        }

        return customerData;
    } catch (error) {
        throw new Error(`Error fetching potential customer data: ${error.message}`);
    }
};

// Function to fetch Insurance data for a customer by Insurance ID
const getInsurance = async (insuranceId) => {
    try {
        const insuranceData = await Insurance.findById(insuranceId);

        if (!insuranceData) {
            throw new Error('Insurance data not found');
        }

        return insuranceData;
    } catch (error) {
        throw new Error(`Error fetching insurance data: ${error.message}`);
    }
};

// Function to fetch Coordinator data for a customer by Coordinator ID
const getCoordinator = async (coordinatorId) => {
    try {
        const coordinatorData = await Coordinator.findById(coordinatorId);

        if (!coordinatorData) {
            throw new Error('Coordinator data not found');
        }

        return coordinatorData;
    } catch (error) {
        throw new Error(`Error fetching coordinator data: ${error.message}`);
    }
};

// Function to update a Potential Customer and handle Coordinator & Insurance checks
const updatePotentialCustomerWithCoordinatorAndInsuranceCheck = async (customerId, potentialCustomerData, insuranceData, coordinatorData) => {
    try {
        const potentialCustomer = await PotentialCustomer.findById(customerId)
            .populate({ path: 'CoordinatorID', model: 'Coordinator', as: 'Coordinator' }) // Use an alias in populate
            .populate({ path: 'InsuranceID', model: 'Insurance', as: 'Insurance' });

        // Check if the potential customer exists
        if (potentialCustomer) {
            potentialCustomer.Coordinator = potentialCustomer.CoordinatorID;
            potentialCustomer.Insurance = potentialCustomer.InsuranceID;
            
            // Remove the old fields
            delete potentialCustomer.CoordinatorID;
            delete potentialCustomer.InsuranceID;
        } else {
            throw new Error('Potential customer not found');
        }

        console.log(potentialCustomer)
        console.log(potentialCustomerData)

        // Compare existing coordinator and insurance data
        let areCoordinatorsSame = true, areInsurancesSame = true;

        if (potentialCustomer.Coordinator) {
            areCoordinatorsSame = Object.keys(coordinatorData).every(
                key => potentialCustomer.Coordinator[key] === coordinatorData[key]
            );
        }

        if (potentialCustomer.Insurance) {
            areInsurancesSame = Object.keys(insuranceData).every(
                key => potentialCustomer.Insurance[key] === insuranceData[key]
            );
        }

        if (areCoordinatorsSame && areInsurancesSame) {
            await PotentialCustomer.updateOne({ _id: customerId }, potentialCustomerData);
        } else {
            if (!areCoordinatorsSame) {
                // Check if the coordinator already exists
                let existingCoordinator = await Coordinator.findOne({
                    Name: coordinatorData.Name,
                    Phone: coordinatorData.Phone,
                    Email: coordinatorData.Email
                });

                if (!existingCoordinator) {
                    // Create a new Coordinator if it doesn't exist
                    existingCoordinator = await Coordinator.create(coordinatorData);
                }

                // Set Coordinator ID in Potential Customer
                potentialCustomerData.coordinator = existingCoordinator._id;
            }

            if (!areInsurancesSame) {
                // Check if the insurance already exists
                let existingInsurance = await Insurance.findOne({
                    AuthUnitsApproved: insuranceData.AuthUnitsApproved,
                    CPT: insuranceData.CPT,
                    Frequency: insuranceData.Frequency,
                    Note: insuranceData.Note
                });

                if (!existingInsurance) {
                    // Create a new Insurance if it doesn't exist
                    existingInsurance = await Insurance.create(insuranceData);
                }

                // Set Insurance ID in Potential Customer
                potentialCustomerData.insurance = existingInsurance._id;
            }

            // Update the potential customer
            await PotentialCustomer.updateOne({ _id: customerId }, potentialCustomerData);
        }
    } catch (error) {
        console.error("Error details:", error);
        throw new Error(`Error updating potential customer data: ${error.message}`);
    }
};

module.exports = {
    getAllCustomers,
    getFullCustomerData,
    updatePotentialCustomerWithCoordinatorAndInsuranceCheck,
    getPotentialCustomer,
    getInsurance,
    getCoordinator
};
