const express = require('express');
const router = express.Router();
const { detail, add, edit, create, allProducts } = require('../controllers/productsController');

/* productos */
router
  .get('/allProducts', allProducts)
  .get('/detail/:id', detail)
  .get('/agregar',add)
  .get('/editar',edit)
  .post('/create',create)


module.exports = router