const createcustomerService = require('../services/createcustomerService.js');
const CustomError = require('../utils/CustomError.js');

// Controller to generate credentials and move customer data
exports.generateCredentials = async (req, res, next) => {
    try {
        const { potentialCustomerID } = req.body
        // Validate input
        if (!potentialCustomerID) {
            throw new CustomError('PotentialCustomerID is required', 400);
        }

        // Finalize customer data and generate credentials
        const result = await createcustomerService.finalizeCustomerData(potentialCustomerID);
        // Respond with the new customer data and generated password
        res.status(201).json({
            success: true,
            message: 'Credentials generated and customer moved successfully.',
            data: {
                customer: result.username,
                password: result.password, // Only include this if you want to display the password
            },
        });
    } catch (error) {
        next(error); // Pass error to the error handler middleware
    }
};
