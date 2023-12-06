var express = require('express');
const { detail } = require('../controllers/productsController');
var router = express.Router();

/* productos */
router
  .get('/detalle/:id?', detail)

module.export = router