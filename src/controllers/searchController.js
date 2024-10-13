const searchService = require('../services/searchService.js');
const { getAllCustomers } = require('../services/customerService');

exports.renderHomePage = async (req, res) => {
    const all_customers = (await getAllCustomers()).map(customer => customer.dataValues);
    try {
        const search = (req.body.search || '').trim();
        const filter = req.body.filter || '';

        const filteredCustomers = await searchService.getFilteredCustomers(search, filter, all_customers);
        res.status(200).json(filteredCustomers);
        
    } catch (error) {
        console.error(error);
        res.status(500).send("An error occurred while fetching customers.");
    }
};
