const express = require('express');
const router = express.Router();
const upload = require("../middlewares/upload");
const { detail, add, edit, update, create, allProducts, remove } = require('../controllers/productsController');

/* productos */
router
  .get('/allProducts', allProducts)
  .get('/detail/:id', detail)
  .get('/agregar', add)
  .get('/editar/:id', edit)
  .put('/editar/:id', upload('productos').fields([
    {name: "mainImage"},
    {name: "image"},
  ]), update)
  .post('/create',create)
  .delete('/delete/:id', remove); 


module.exports = router