const express = require('express');
const router = express.Router();
const { login, register } = require('../controllers/usersController');

/* /users */
router
  .get('/login', login)
  .get('/register', register)

module.exports = router;