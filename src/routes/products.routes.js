const express = require('express');
const router = express.Router();
const { detail, add, edit, create } = require('../controllers/productsController');

/* productos */
router
  .get('/detail', detail)
  .get('/create',add)
  .get('/editar',edit)
  .post('/create',create)


module.exports = router