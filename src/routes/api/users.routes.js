const express = require('express');
const router = express.Router();

const { listUsers, detailUsers } = require('../../api/usersController');

/* /users */
router
  .get('/api/users', listUsers)
  .get('/api/users/:id', detailUsers)
 

module.exports = router;