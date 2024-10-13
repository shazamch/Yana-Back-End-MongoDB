const express = require('express');
const router = express.Router();
const complaintsController = require('../controllers/complaintsController');

router.post('/', complaintsController.createComplaint);
router.get('/', complaintsController.getAllComplaints);
router.get('/:id', complaintsController.getComplaintById);
router.put('/:id', complaintsController.updateComplaint);
router.delete('/:id', complaintsController.deleteComplaint);

module.exports = router;
