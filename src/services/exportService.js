const fs = require('fs');
const path = require('path');
const xlsx = require('xlsx');
const Orders = require('../models/Orders');
const Customer = require('../models/Customer');

exports.exportOrdersDataToExcel = async () => {
    try {
        // Fetch data from the Orders table
        const ordersData = await Orders.findAll({
            raw: true,
            where: { Status: 'Active' },
            attributes: { exclude: ['OrderPlaceDateTime', 'OrderCompleteDateTime', 'createdAt', 'updatedAt', 'Status'] },
            include: [
                {
                    model: Customer,
                    attributes: ['Phone', 'DeliveryNote', 'PreferredDeliveryTime', 'AlternateContactName', 'AlternateContactPhone', 'AlternateContactAddress', 'Allergies']
                }
            ]
        });
        // Format Data
        const processedOrdersData = ordersData.map(order => {
            // Use the DishIDsList directly as it's already an object
            const dishList = order.DishIDsList || [];

            // Create the base order data object with relevant fields
            const orderData = {
                OrderID: order.OrderID,
                Name: order.CustomerName,
                ContactNo: order['Customer.Phone'],
                Address: order.DeliveryAddress,
                Delivery_Instructions: order['Customer.DeliveryNote'],
                PreferredDeliveryTime: order['Customer.PreferredDeliveryTime'],
                AlternateContactName: order['Customer.AlternateContactName'],
                AlternateContactPhone: order['Customer.AlternateContactPhone'],
                AlternateContactAddress: order['Customer.AlternateContactAddress'],
                Allergies: order['Customer.Allergies'],
                OrderInstructions: order.OrderInstructions,
                Cost: order.OrderCost,
            };

            // Assign dishes to their respective columns
            dishList.forEach((dish, index) => {
                orderData[`Dish${index + 1}`] = dish.DishName; // Use DishName for the column
                // Optionally, you can also add the count if needed
                orderData[`Dish${index + 1}Count`] = dish.Count; // Use Count for the column
            });

            return orderData;
        }).filter(order => order !== null); // Filter out any null orders

        // Check if processedOrdersData has data
        if (processedOrdersData.length === 0) {
            console.warn('No valid order data to write to Excel.');
            return null; // Early return if no valid orders
        }

        // Create a new workbook and add the data
        const workbook = xlsx.utils.book_new();
        const worksheet = xlsx.utils.json_to_sheet(processedOrdersData);
        xlsx.utils.book_append_sheet(workbook, worksheet, 'Orders');

        // Define file path for storing the Excel file
        const exportDir = path.join(__dirname, '../sheet');
        if (!fs.existsSync(exportDir)) {
            fs.mkdirSync(exportDir);
        }

        // Get current date and format it with dashes (YYYY-MM-DD)
        const now = new Date();
        const formattedDate = now.toISOString().split('T')[0]; // Get YYYY-MM-DD format

        // File path with dashes between year, month, and day
        const filePath = path.join(exportDir, `orders_${formattedDate}.xlsx`);

        // Write the Excel file to the directory
        xlsx.writeFile(workbook, filePath);

        return filePath;
    } catch (error) {
        throw new Error('Error generating Excel file: ' + error.message);
    }
};
