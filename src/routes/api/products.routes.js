const express = require('express');
const router = express.Router();

const { listProduct, detailProduct } = require('../../api/productsController');

/* API routes */
router
  .get('/api/products', listProduct)
  .get('/api/products/:id', detailProduct)

module.exports = router