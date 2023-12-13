const express = require('express');
const router = express.Router();
const { detail, add, edit } = require('../controllers/productsController');

/* productos */
router
  .get('/detail', detail)
  .get('/agregar',add)
  .get('/editar',edit)

module.exports = router