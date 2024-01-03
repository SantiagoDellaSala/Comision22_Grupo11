const express = require('express');
const router = express.Router();
const { detail, add, edit, update, create, allProducts, kill } = require('../controllers/productsController');

/* productos */
router
  .get('/allProducts', allProducts)
  .get('/detail/:id', detail)
  .get('/agregar', add)
  .get('/editar/:id', edit)
  .put('/editar/:id', update)
  .post('/create',create)
  .delete('/delete', kill)

module.exports = router