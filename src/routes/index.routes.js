var express = require('express');
var router = express.Router();
const {index, cart} = require('../controllers/indexController');

/* / */
router
  .get('/', index)
  .get('/carrito', cart)

module.export = router