const express = require('express');
const logger = require('morgan');
const cors = require('cors');
const path = require('path');
const {
  failErrorResponse,
  serverErrorResponse,
} = require('../helpers/responseHandles');

module.exports = async ({ app }) => {
  app.use(logger('dev'));

  // Parse Various Requests
  app.use(express.json({ extended: true }));
  app.use(express.urlencoded());

  // Enabling cors policy
  app.use(cors());

  // Serving static react files
  app.use(express.static(path.join(__dirname, '..', 'client', 'build')));

  app.use('/api/v1/auth', require('../routes/auth/auth'));
  app.use('/api/v1/dsat', require('../routes/DSAT/exam'));
  app.use('/api/v1/result', require('../routes/DSAT/result'));
  app.use('/api/v1/admin', require('../routes/admin/adminAuth'));
  app.use('/api/v1/test', require('../routes/user/test'));

  // Any other routes serves the React App
  app.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'client', 'build', 'index.html'));
  });

  // Error Handlers
  app.use((err, req, res, next) => {
    /**
     * Handle 401 thrown by express-jwt library
     */
    if (err.name === 'UnauthorizedError') {
      return res.status(err.status).send({ message: err.message }).end();
    }
    return next(err);
  });

  // Handle any remaining errors
  app.use((err, req, res, next) => {
    console.log(err);
    res.status(err.status || 500);
    res.json(failErrorResponse(err.message));
  });
};
