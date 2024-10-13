const authService = require('../services/authService');
const ApiResponse = require('../utils/ApiResponse');
const CustomError = require('../utils/CustomError');

// Controller for creating a new Admin
exports.createAdmin = async (req, res, next) => {
  try {
    const { email } = req.body;

    if (!email) {
      throw new CustomError('Email is required', 400);
    }

    const newAdmin = await authService.createAdmin(email);

    // Remove the password from the response for security purposes
    const { password, ...adminData } = newAdmin;

    res.status(201).json(new ApiResponse(201, adminData, 'Admin created successfully.').toJSON());

    console.log(`Generated credentials for Admin:
      Username: ${newAdmin.username}
      Password: ${password}`); // Log the generated credentials for debugging
  } catch (error) {
    next(error);
  }
};

// Controller for Admin login
exports.loginAdmin = async (req, res, next) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      throw new CustomError('Username and password are required', 400);
    }

    const { accessToken, refreshToken } = await authService.loginAdmin(username, password);
    res.status(200).json(new ApiResponse(200, { accessToken, refreshToken }, 'Login successful').toJSON());
  } catch (error) {
    next(error);
  }
};

// Controller for refreshing the token
exports.refreshToken = async (req, res, next) => {
  try {
    const { refreshToken } = req.body;

    if (!refreshToken) {
      throw new CustomError('Refresh token is required', 400);
    }

    const newAccessToken = await authService.refreshToken(refreshToken);
    res.status(200).json(new ApiResponse(200, { accessToken: newAccessToken }, 'Token refreshed successfully').toJSON());
  } catch (error) {
    next(error);
  }
};

// Controller for Admin logout
exports.logoutAdmin = async (req, res, next) => {
  try {
    res.status(200).json(new ApiResponse(200, null, 'Logout successful').toJSON());
  } catch (error) {
    next(error);
  }
};