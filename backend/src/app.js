const express = require('express');
const cors = require('cors');
const helmet = require('helmet');

const {errorHandler} = require('./middleware/error'); 
const authRoutes = require('./modules/auth/routes');
const loanRoutes = require('./modules/loans/routes');

const app = express();

app.use(helmet());
app.use(cors({ origin: ['http://localhost:5173']}));
app.use(express.json());

app.get('/health', (_req, res) => res.json({ok: true }));

app.use('./auth', authRoutes);
app.use('./loans', loanRoutes);

app.use(errorHandler);

module.exports = app;