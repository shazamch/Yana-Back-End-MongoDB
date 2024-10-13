// utils/generateAdminCredentials.js
const crypto = require('crypto');

const generateAdminCredentials = () => {
  // Generate a random username
  const username = `admin_${crypto.randomBytes(4).toString('hex')}`;

  // Generate a random password
  const password = crypto.randomBytes(8).toString('hex'); // Random 8-byte password

  return { username, password };
};

module.exports = generateAdminCredentials;
