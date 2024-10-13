const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Admin = require('../models/Admin'); // Ensure this points to your new Mongoose Admin model
const CustomError = require('../utils/CustomError');
const { generateAccessToken, generateRefreshToken, verifyRefreshToken } = require('../utils/jwtUtils');

exports.createAdmin = async (email) => {
  // Generate a username from the email
  const username = email.split('@')[0];
  const password = `${username}123`; // Temporary password

  // Hash the password
  const hashedPassword = await bcrypt.hash(password, 10);

  // Create the admin in the database
  try {
    const newAdmin = await Admin.create({
      Username: username,
      Password: hashedPassword,
      Email: email,
      Role: 'Admin', // Default role is Admin
    });

    return {
      username: newAdmin.Username,
      email: newAdmin.Email,
      password, // Return the plain password for display or further processing (ensure to handle this securely)
    };
  } catch (error) {
    throw new CustomError('Failed to create admin', 500);
  }
};

exports.loginAdmin = async (username, password) => {
  // Find the admin by username
  const admin = await Admin.findOne({ Username: username });

  if (!admin) {
    throw new CustomError('Invalid credentials', 401);
  }

  // Validate the password
  const isPasswordValid = await bcrypt.compare(password, admin.Password);
  if (!isPasswordValid) {
    throw new CustomError('Invalid credentials', 401);
  }

  // Generate JWT and refresh tokens
  const accessToken = generateAccessToken(admin); // Use _id for Mongoose
  const refreshToken = generateRefreshToken(admin);

  return { accessToken, refreshToken };
};

exports.refreshToken = async (token) => {
  try {
    // Verify the refresh token
    const decoded = verifyRefreshToken(token);

    // Check if the refresh token exists in the database
    await refreshTokenService.findToken(token);

    // Find the associated admin using the ID from the token
    const admin = await Admin.findById(decoded.id); // Use findById for Mongoose

    if (!admin) {
      throw new CustomError('Admin not found', 404);
    }

    // Generate a new access token
    const newAccessToken = generateAccessToken({ id: admin.AdminID });

    return { newAccessToken };
  } catch (error) {
    console.error('Error refreshing token:', error.message);
    throw new CustomError('Error refreshing token', 500);
  }
};

exports.logoutAdmin = async () => {
  try {
    console.log("Logout Sucessfull")
  } catch (error) {
    console.error('Error logging out:', error.message);
    throw new CustomError('Error logging out', 500);
  }
};
