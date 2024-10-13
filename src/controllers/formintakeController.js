const formintakeService = require('../services/formintakeService.js');


const getAllCustomersData = async (req, res, next) => {
    try {
        
        const potentialCustomersData = await formintakeService.getAllCustomers();
        

        // Send the response with the fetched data
        res.status(200).json({
            success: true,
            data: potentialCustomersData
        });
    } catch (error) {
        res.status(404).json({
            success: false,
            message: error.message || 'Error fetching data'
        });
        next(error); // Optionally pass error to middleware
    }
};

// Define the getAllData function
const getAllData = async (req, res, next) => {
    try {
        const { customerId } = req.params;

        // Fetch data from all models (PotentialCustomers, Insurance, and Coordinator)
        const potentialCustomerData = await formintakeService.getPotentialCustomer(customerId);
        const insuranceData = await formintakeService.getInsurance(potentialCustomerData.InsuranceID);
        const coordinatorData = await formintakeService.getCoordinator(potentialCustomerData.CoordinatorID);

        // Send the response with the fetched data
        res.status(200).json({
            success: true,
            data: {
                potentialCustomer: potentialCustomerData || {},
                insurance: insuranceData || {},
                coordinator: coordinatorData || {}
            }
        });
    } catch (error) {
        res.status(404).json({
            success: false,
            message: error.message || 'Error fetching data'
        });
        next(error); // Optionally pass error to middleware
    }
};

// Controller function to update all data for a specific customer
const updateAllData = async (req, res, next) => {
    try {
        const { customerId } = req.params;
        const potentialCustomerData = req.body
        potentialCustomerData.Status = "Approved";
        const insuranceData = potentialCustomerData.Insurance
        const coordinatorData = potentialCustomerData.Coordinator

        // Ensure that at least some data is provided for update
        if (!potentialCustomerData && !insuranceData && !coordinatorData) {
            return res.status(400).json({
                success: false,
                message: 'No data provided for update'
            });
        }

        // Call the service to update PotentialCustomer, Coordinator, and Insurance
        const result = await formintakeService.updatePotentialCustomerWithCoordinatorAndInsuranceCheck(
            customerId, potentialCustomerData, insuranceData, coordinatorData
        );

        res.status(200).json({ 
            success: true, 
            message: 'Data updated successfully',
            data: result
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message || 'Error updating customer data'
        });
        next(error);
    }
};

// Export the controller functions
module.exports = {
    getAllCustomersData,
    getAllData,
    updateAllData
};
