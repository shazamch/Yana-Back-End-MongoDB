const bcrypt = require('bcrypt');
const CustomError = require('../utils/CustomError.js');
const potentialCustomerService = require('../services/potentialCustomerService.js');
const customerService = require('../services/customerService.js');
const Customer = require('../models/Customer'); // Import the Customer model
const Insurance = require('../models/Insurance');
const Coordinator = require('../models/Coordinator');

// Helper function to generate a secure password
const generatePassword = (name, dob) => {
    const basePassword = `${name}${dob.replace(/-/g, '')}`; // Remove dashes from DOB if present
    return basePassword;
};

// Helper function to generate a unique username and hash the password
const generateUniqueUsernameAndPassword = async (firstName, dob) => {
    const generateUsername = () => {
        const randomNumber = Math.floor(Math.random() * 10000); // Random number between 0 and 9999
        return `${firstName}${randomNumber}`;
    };

    let username;
    let existingCustomer;
    do {
        username = generateUsername(); // Generate a new username
        existingCustomer = await customerService.getCustomerByUsername(username);
    } while (existingCustomer); // Ensure the username is unique

    const basePassword = generatePassword(firstName, dob);
    const hashedPassword = await bcrypt.hash(basePassword, 10); // Hash the password

    return { username, password: basePassword, hashedPassword };
};

// Finalize customer data by creating a new customer record
const finalizeCustomerData = async (potentialCustomerID) => {
    try {
        const potentialCustomer = await potentialCustomerService.getCustomerById(potentialCustomerID);
        if (!potentialCustomer) {
            throw new CustomError('Potential customer not found', 404);
        }
        if (potentialCustomer.Status === "Pending") {
            throw new CustomError('Fill data first', 405);
        }

        const { username, password, hashedPassword } = await generateUniqueUsernameAndPassword(
            potentialCustomer.Name.split(' ')[0], 
            potentialCustomer.MemberDOB.toISOString().split('T')[0]
        );

        const existingUser = await Customer.findOne({ Username: username });
        if (existingUser) {
            throw new CustomError(`Username "${username}" already exists.`, 409);
        }

        const customerData = {
            Username: username,
            Password: hashedPassword,
            MemberID: potentialCustomer.MemberID,
            Name: potentialCustomer.Name,
            MedicaidID: potentialCustomer.MedicaidID,
            Phone: potentialCustomer.Phone,
            Address: potentialCustomer.Address,
            DeliveryNote: potentialCustomer.DeliveryNote,
            PreferredDeliveryTime: potentialCustomer.PreferredDeliveryTime,
            AlternateContactName: potentialCustomer.AlternateContactName,
            AlternateContactPhone: potentialCustomer.AlternateContactPhone,
            AlternateContactAddress: potentialCustomer.AlternateContactAddress,
            Allergies: potentialCustomer.Allergies,
            MemberDOB: potentialCustomer.MemberDOB,
            IOType: potentialCustomer.IOType,
            AuthNumberFacets: potentialCustomer.AuthNumberFacets,
            StartDT: potentialCustomer.StartDT,
            EndDT: potentialCustomer.EndDT,
            ICD10Code: potentialCustomer.ICD10Code,
            Status: 'Active',
            CoordinatorID: potentialCustomer.CoordinatorID?.toString(),
            InsuranceID: potentialCustomer.InsuranceID?.toString(),
        };

        const newCustomer = await Customer.create(customerData);
        await potentialCustomerService.rejectPotentialCustomer(potentialCustomerID);

        return { newCustomer, password, username };
    } catch (error) {
        console.error(`Error finalizing customer data: ${error.message}`);
        throw new CustomError(`Error finalizing customer data: ${error.message}`, 500);
    }
};

module.exports = {
    finalizeCustomerData,
};
