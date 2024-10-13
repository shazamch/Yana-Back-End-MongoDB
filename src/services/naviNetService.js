const xlsx = require('xlsx');
const fs = require('fs');
const path = require('path');
const Customer = require('../models/Customer');
const Coordinator = require('../models/Coordinator');
const Insurance = require('../models/Insurance');
const PendingChanges = require('../models/PendingChanges');
const PotentialCustomer = require('../models/PotentialCustomer');
const CustomError = require('../utils/CustomError');

const compareAndUpdate = async (filePath) => {
  const errors = []; // Array to accumulate errors

  try {
    // Load the uploaded Excel file
    let workbook;
    try {
      workbook = xlsx.readFile(filePath);
    } catch (error) {
      throw new CustomError('Failed to read the Excel file. Ensure the file format is correct.', 400);
    }

    const sheet_name_list = workbook.SheetNames;
    let data;
    try {
      data = xlsx.utils.sheet_to_json(workbook.Sheets[sheet_name_list[0]], { defval: null });
    } catch (error) {
      throw new CustomError('Failed to parse the Excel sheet. Ensure the sheet structure is valid.', 400);
    }

    if (!data.length) {
      throw new CustomError('No data found in the uploaded file', 400);
    }

    const updatedCustomers = [];
    const newPotentialCustomers = [];

    // Iterate through each row in the Excel file
    for (const row of data) {
      const { MemberID } = row;

      if (!MemberID) {
        const errorMessage = 'Missing MemberID in row. Skipping this row.';
        console.error(errorMessage);
        errors.push({ row, error: errorMessage });
        continue;
      }

      try {
        // Check if the member exists in the Customer table
        let customer = await Customer.findOne({ MemberID });

        // Check if the member exists in the PotentialCustomer table if not found in Customer
        let potentialCustomer = null;
        if (!customer) {
          potentialCustomer = await PotentialCustomer.findOne({ MemberID });
        }

        // Function to find or create a Coordinator based on the combination of details
        const findOrCreateCoordinator = async (row) => {
          try {
            const coordinator = await Coordinator.findOne({
              Name: row.ServiceCoordinatorName || null,
              Phone: row.ServiceCoordinatorPhone || null,
              Email: row.ServiceCoordinatorEmail || null
            });
            if (coordinator) {
              return coordinator;
            } else {
              return await Coordinator.create({
                Name: row.ServiceCoordinatorName || null,
                Phone: row.ServiceCoordinatorPhone || null,
                Email: row.ServiceCoordinatorEmail || null
              });
            }
          } catch (error) {
            throw new CustomError(`Failed to find or create coordinator for MemberID ${MemberID}: ${error.message}`, 500);
          }
        };

        // Function to find or create an Insurance entry based on the combination of details
        const findOrCreateInsurance = async (row) => {
          try {
            const insurance = await Insurance.findOne({
              AuthUnitsApproved: row.AuthUnitsApproved || null,
              CPT: row.Code || null,
              Frequency: row.Frequency || null,
              Note: row.Note || null
            });
            if (insurance) {
              return insurance;
            } else {
              return await Insurance.create({
                AuthUnitsApproved: row.AuthUnitsApproved || null,
                CPT: row.Code || null,
                Frequency: row.Frequency || null,
                Note: row.Note || null
              });
            }
          } catch (error) {
            throw new CustomError(`Failed to find or create insurance for MemberID ${MemberID}: ${error.message}`, 500);
          }
        };

        const coordinator = await findOrCreateCoordinator(row);
        const insurance = await findOrCreateInsurance(row);

        if (customer) {
          // Check and compare each field for existing customer
          const hasDifferences = (
            customer.MedicaidID !== (row.MedicaidID || null) ||
            customer.Name !== (row.Name || null) ||
            customer.Phone !== (row.Phone || null) ||
            customer.IOType !== (row.IOType || null) ||
            customer.AuthNumberFacets !== (row.AuthNumberFacets || null) ||
            customer.StartDT?.getTime() !== new Date(row.StartDT || null).getTime() ||
            customer.EndDT?.getTime() !== new Date(row.EndDT || null).getTime() ||
            customer.Status !== (row.Status || null) ||
            String(customer.CoordinatorID) !== String(coordinator._id.toString()) ||
            String(customer.InsuranceID) !== String(insurance._id.toString())
          );

          if (hasDifferences) {
            console.log(`Differences found for customer ID: ${customer.CustomerID}`);
            try {
              await customer.updateOne({
                Status: 'Inactive',
                CoordinatorID: coordinator._id.toString(),
                InsuranceID: insurance._id.toString()
              });
            } catch (error) {
              throw new CustomError(`Failed to update customer with MemberID ${MemberID}: ${error.message}`, 500);
            }

            // Save the differences in PendingChanges
            for (const key in row) {
              if (row[key] !== customer[key]) {
                try {
                  await PendingChanges.create({
                    CustomerID: customer.CustomerID,
                    Field: key,
                    PreviousValue: customer[key],
                    NewValue: row[key],
                  });
                } catch (error) {
                  throw new CustomError(`Failed to log pending change for customer with MemberID ${MemberID}: ${error.message}`, 500);
                }
              }
            }

            updatedCustomers.push(customer);
          }
        } else if (potentialCustomer) {
          // Check and compare each field for existing potential customer
          const hasDifferences = (
            potentialCustomer.MedicaidID !== (row.MedicaidID || null) ||
            potentialCustomer.Name !== (row.Name || null) ||
            potentialCustomer.Phone !== (row.Phone || null) ||
            potentialCustomer.MemberDOB?.getTime() !== new Date(row.MemberDOB || null).getTime() ||
            String(potentialCustomer.CoordinatorID) !== String(coordinator._id.toString()) ||
            String(potentialCustomer.InsuranceID) !== String(insurance._id.toString())
          );

          if (hasDifferences) {
            console.log(`Differences found for potential customer ID: ${potentialCustomer.MemberID}`);
            try {
              await potentialCustomer.updateOne({
                MedicaidID: row.MedicaidID || null,
                Name: row.Name || null,
                Phone: row.Phone || null,
                MemberDOB: new Date(row.MemberDOB || null),
                CoordinatorID: coordinator._id.toString(),
                InsuranceID: insurance._id.toString()
              });
            } catch (error) {
              throw new CustomError(`Failed to update potential customer with MemberID ${MemberID}: ${error.message}`, 500);
            }

            // Log these changes in PendingChanges if needed
            for (const key in row) {
              if (row[key] !== potentialCustomer[key]) {
                try {
                  await PendingChanges.create({
                    PotentialCustomerID: potentialCustomer._id.toString(),
                    Field: key,
                    PreviousValue: potentialCustomer[key],
                    NewValue: row[key],
                  });
                } catch (error) {
                  throw new CustomError(`Failed to log pending change for potential customer with MemberID ${MemberID}: ${error.message}`, 500);
                }
              }
            }

            updatedCustomers.push(potentialCustomer); // Assuming you want to track updated potential customers
          }
        } else {
          // If not found in either Customer or PotentialCustomer, treat as a new potential customer
          try {
            const newPotentialCustomer = await PotentialCustomer.create({
              MemberID: row.MemberID,
              Name: row.Name || null,
              MedicaidID: row.MedicaidID || null,
              Phone: row.Phone || null,
              MemberDOB: new Date(row.MemberDOB || null),
              StartDT: new Date(row.StartDT || null),
              EndDT: new Date(row.EndDT || null),
              ICD10Code: row.ICD10Code || null,
              IOType: row.IOType || null,
              AuthNumberFacets: row.AuthNumberFacets || null,
              Status: 'Pending', // Mark as pending
              CoordinatorID: coordinator._id.toString(),
              InsuranceID: insurance._id.toString()
            });

            newPotentialCustomers.push(newPotentialCustomer);
          } catch (error) {
            throw new CustomError(`Failed to create potential customer with MemberID ${MemberID}: ${error.message}`, 500);
          }
        }
      } catch (error) {
        console.error(`Error processing row with MemberID ${MemberID}: ${error.message}`);
        errors.push({ MemberID, error: error.message });
        continue;
      }
    }

    return {
      updatedCustomers,
      newPotentialCustomers,
      errors, // Return the accumulated errors
    };

  } catch (error) {
    console.error(`Error in compareAndUpdate: ${error.message}`);
    throw new CustomError(`Error processing the Excel file: ${error.message}`, error.code || 500);
  } finally {
    // Clean up the file after processing
    fs.unlink(filePath, (err) => {
      if (err) console.error(`Failed to delete file ${filePath}: ${err.message}`);
    });
  }
};

module.exports = {
  compareAndUpdate
};
