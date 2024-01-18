const express = require('express');
const router = express.Router();
const { login, register, profile, editProfile } = require('../controllers/usersController');

/* /users */
router
  .get('/login', login)
  .get('/register', register)
  .get('/profile/:id', profile)
  .put('/editProfile/:id', editProfile)

module.exports = router;