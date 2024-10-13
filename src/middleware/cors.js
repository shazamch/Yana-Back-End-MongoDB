// middleware/cors.js
const cors = require('cors');

const corsOptions = {
  origin: 'http://localhost:5173', // Replace with your client URL
  optionsSuccessStatus: 200, // Some legacy browsers (IE11, SmartTVs) choke on 204
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true // Enable if you want to allow cookies to be sent with requests
};

module.exports = cors(corsOptions);
