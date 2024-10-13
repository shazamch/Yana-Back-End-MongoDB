const exportService = require('../services/exportService');

exports.exportOrdersToExcel = async (req, res) => {
    try {
        const filePath = await exportService.exportOrdersDataToExcel();
        res.download(filePath, 'orders.xlsx');
    } catch (error) {
        res.status(500).send({ message: 'Error exporting orders', error });
    }
};
