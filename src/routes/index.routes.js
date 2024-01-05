const express = require('express');
const router = express.Router();
const {index, cart, admin, search} = require('../controllers/indexController');

/* / */
router
  .get('/', index)
  .get('/carrito', cart)
  .get('/admin', admin)
  .get('/search', search); 

module.exports = router