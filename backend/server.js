const express = require('express');
const cors = require('cors');
require('dotenv').config();
const homepageRouter = require('./controller/homepage');
const registerRouter = require('./controller/register');
const loginRouter = require('./controller/login');
const cookieParser = require('cookie-parser');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/', homepageRouter);
app.use('/', registerRouter);
app.use('/', loginRouter);

// Error handling middleware
app.use((error, req, res, next) => {
  console.error('Global error handler:', error);
  res.status(500).json({ 
    error: 'Internal server error',
    details: error.message 
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server je pokrenut na portu ${PORT}`);
  console.log(`Provjera baze: http://localhost:${PORT}/provjera`);
});