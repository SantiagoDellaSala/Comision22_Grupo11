const express = require('express');
const router = express.Router();
const { login, register, profile } = require('../controllers/usersController');

/* /users */
router
  .get('/login', login)
  .get('/register', register)
  .get('/profile/:id', profile)

module.exports = router;