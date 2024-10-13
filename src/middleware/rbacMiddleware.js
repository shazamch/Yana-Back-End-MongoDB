const CustomError = require('../utils/CustomError');

// Define role hierarchy. Higher roles have more access.
const roleHierarchy = {
  superAdmin: 2,
  admin: 1, // Example lower role (optional)
};

const rbac = (requiredRole) => {
  return (req, res, next) => {
    console.log("RBAC Middleware: req.user before role check:", req.user); // Log req.user

    const userRole = req.user.role; // Assuming req.user is set by authentication middleware
    console.log("RBAC Middleware: userRole derived from req.user:", userRole);
    console.log("RBAC Middleware: requiredRole:", requiredRole);

    // Check if user's role has equal or higher privilege than the required role
    if (roleHierarchy[userRole] < roleHierarchy[requiredRole]) {
      console.log("Role mismatch. Access forbidden.");
      return next(new CustomError('Forbidden: You do not have access to this resource.', 403));
    }

    next(); // If the role matches or is higher, proceed to the next middleware/route handler
  };
};

module.exports = rbac;