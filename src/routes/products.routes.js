const express = require('express');
const router = express.Router();
const { detail, add, edit, create, remove } = require('../controllers/productsController');

/* productos */
router
  .get('/detail', detail)
  .get('/create',add)
  .get('/editar',edit)
  .post('/create',create)
  .delete('/delete/:id', remove); 


module.exports = router