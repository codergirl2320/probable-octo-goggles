// DEPENDENCIES
//==================

const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const User = require('../models/usermodel.js')

// ROUTES
//==================

// START A NEW SESSION UPON LOG IN

router.post('/', (req, res) => {
  User.findOne({unsername: req.body.username},(error, foundUser) => {
    if (foundUser === null){
// if the user couldnt be found send the message --->
      res.json({
        message: 'Sorry, we couldn\'t find this user.'
      })
    } else {
// compare passwords, via bcrypt
      const passMatch = bcrypt.compareSync(req.body.password, foundUser.password)
      if (passMatch){
        req.session.user = foundUser
        res.json(foundUser)
      } else {
        res.json({
          message: 'This password was invalid.'
        });
      }
    }
  });
});

// GET THE NEW USER

router.get('/', (req, res) => {
  res.json(req.session.user)
})


// DELETE SESSION UPON LOGOUT

router.delete('/', (req, res) => {
  req.session.destroy(() => {
    res.json({
      destroyed: true
    })
  })
});

module.exports = router;
