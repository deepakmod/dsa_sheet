// server.js
const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');
const path = require("path");

// Load env vars
dotenv.config();

// Connect to database
connectDB();

const app = express();

// Middlewares
app.use(cors()); // Allow cross-origin requests
app.use(express.json()); // Body parser

// Mount Routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/topics', require('./routes/topicRoutes'));
app.use('/api/problems', require('./routes/problemRoutes'));
app.use('/api/user', require('./routes/userRoutes'));

// static react build
app.use(express.static(path.join(__dirname, '../client/dist')));

// fallback for SPA using regex
app.get(/.*/, (req, res) => {
  res.sendFile(path.join(__dirname, '../client/dist/index.html'));
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));