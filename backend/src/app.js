// src/app.js
const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors');
const rateLimit = require('express-rate-limit');

const app = express();

// Middleware
app.use(helmet());
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

// Rate limiter
app.use(rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100
}));

app.use('/api/auth', require('./routes/authRoutes'));

app.use('/logs', require('./routes/logRoutes'));

app.use('/alerts', require('./routes/alertRoutes'));

app.use('/stats', require('./routes/statRoutes'));

app.use('/admin', require('./routes/adminRoutes'));

// Routes (temporary)
app.get('/', (req, res) => {
  res.send('Welcome to FireLog API');
});

module.exports = app;
