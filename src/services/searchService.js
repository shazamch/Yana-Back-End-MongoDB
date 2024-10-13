exports.getFilteredCustomers = async (search, filter, all_Customers) => {
    let filteredCustomers = all_Customers;
    if (search) {
        const searchTerm = search.toLowerCase();
        filteredCustomers = filteredCustomers.filter(customer =>
            (customer.Name && customer.Name.toLowerCase().includes(searchTerm))
        );
    }

    if (filter && filter !== 'all') {
        filteredCustomers = filteredCustomers.filter(customer =>
            customer.Name.toLowerCase() === filter.toLowerCase()
        );
    }
    return filteredCustomers;
};