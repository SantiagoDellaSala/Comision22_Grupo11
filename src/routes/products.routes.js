const express = require('express');
const router = express.Router();
const { detail, add, edit, productos, allProducts } = require('../controllers/productsController');

/* productos */
router
  .get('/allProducts', allProducts)
  .get('/detail/:id', detail)
  .get('/agregar',add)
  .get('/editar',edit)

module.exports = router