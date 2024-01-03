const express = require('express');
const router = express.Router();
const { detail, add, edit, create, remove } = require('../controllers/productsController');

/* productos */
router
  .get('/allProducts', allProducts)
  .get('/detail/:id', detail)
  .get('/agregar', add)
  .get('/editar/:id', edit)
  .put('/update/:id', update)
  .post('/create',create)
  .delete('/delete/:id', remove); 


module.exports = router