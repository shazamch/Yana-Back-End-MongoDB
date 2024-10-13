require('dotenv').config(); // Load environment variables from .env file
const { Sequelize } = require('sequelize');

// Create a new Sequelize instance using the environment variables
const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
  host: process.env.DB_HOST,
  port: process.env.DB_PORT || 3306, // Use the port from .env or default to 3306
  dialect: 'mysql',
  logging: false, // Set to true if you want to see the SQL queries in the console
});

// Test the database connection
sequelize.authenticate()
  .then(() => {
    // console.log('Connection to the MySQL database has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err.message);
    process.exit(1);
  });

module.exports = sequelize;
