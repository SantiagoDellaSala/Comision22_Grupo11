const express = require('express');
const router = express.Router();
const { detail, add } = require('../controllers/productsController');

/* productos */
router
  .get('/detail', detail)
  .get('/agregar',add)

module.exports = router