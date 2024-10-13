const bcrypt = require('bcrypt');

const plainPassword = 'superadminpassword'; // Choose a secure password
const saltRounds = 10;

bcrypt.hash(plainPassword, saltRounds, function(err, hash) {
  if (err) throw err;
  console.log('Hashed password:', hash);
  // Use this hash in your SQL insert statement
});
