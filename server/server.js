const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');
const path = require("path");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");

dotenv.config();

connectDB();

const app = express();

app.use(cors({
  origin: process.env.CLIENT_URL,
  credentials: true
}));

app.use(express.json());

app.use(helmet());

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, 
  max: 100,                
  message: { success: false, msg: "Too many requests. Try again later." }
});
app.use(limiter);

app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/topics', require('./routes/topicRoutes'));
app.use('/api/problems', require('./routes/problemRoutes'));
app.use('/api/user', require('./routes/userRoutes'));

app.use(express.static(path.join(__dirname, '../client/dist')));

app.get(/.*/, (req, res) => {
  res.sendFile(path.join(__dirname, '../client/dist/index.html'));
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, "0.0.0.0", () => console.log(`Server running on port ${PORT}`));
