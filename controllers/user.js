// DEPENDENCIES
//==================
const express = require('express')
const router = express.Router();
const bcrypt = require('bcryptjs');
const User = require('../models/usermodel.js');

// NEW USER POST ROUTE
//==================

router.post('/', (req, res) => {
  req.body.password = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10));
    User.create(req.body, (error, createdUser) => {
      req.session.user = createdUser;
      res.json(createdUser)
    })
});


module.exports = router;
