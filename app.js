const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const authRoutes = require('./src/routes/authRoutes');

dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());

// Use routes
app.use('/api/auth', authRoutes);

module.exports = app; // Ensure this line is correct
