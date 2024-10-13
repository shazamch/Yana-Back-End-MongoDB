const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const authenticateToken = require('../middleware/authenticateToken');
const rbac = require('../middleware/rbacMiddleware');

// Protect all routes
router.post('/', authenticateToken, rbac('Super Admin'), adminController.createAdmin);
router.get('/', authenticateToken, rbac('Admin'), adminController.getAllAdmins);
router.get('/:id', authenticateToken, rbac('Admin'), adminController.getAdminById);
router.put('/:id', authenticateToken, rbac('Super Admin'), adminController.updateAdmin);
router.delete('/:id', authenticateToken, rbac('Super Admin'), adminController.deleteAdmin);

module.exports = router;
