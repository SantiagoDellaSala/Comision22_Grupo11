var express = require('express');
const { login, register } = require('../controllers/usersController');
var router = express.Router();

/* /usurios */
router
  .get('/ingreso', login)
  .get('/registro', register)

module.exports = router;