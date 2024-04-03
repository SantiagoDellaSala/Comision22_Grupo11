const express = require('express');
const { indexApi } = require('../../api');
const router = express.Router();

/* API index */
router
  .get('/api/home', indexApi)

module.exports = router;