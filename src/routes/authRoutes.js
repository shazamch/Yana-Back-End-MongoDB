const express = require('express');
const authController = require('../controllers/authController');
const authenticateToken = require('../middleware/authenticateToken');
const rbac = require('../middleware/rbacMiddleware');
const router = express.Router();

// Route for Super Admin to create a new Admin
router.post('/create-admin', authenticateToken, rbac('Super Admin'), authController.createAdmin);

// Route for Admin login
router.post('/login', authController.loginAdmin);

// Route for refreshing the token
router.post('/refreshtoken', authController.refreshToken);

// Route for Admin logout
router.post('/logout', authController.logoutAdmin);


module.exports = router;
