const express = require("express");
const router = express.Router();
const { check } = require('express-validator');
const usersignup = require('../controller/usersignup')


const signupMiddleware = (req, res, next) => { 
  try {
    [
      check("username", "Please Enter a Valid Username")
      .not()
      .isEmpty(),
      check("email", "Please enter a valid email").isEmail(),
      check("password", "Please enter a valid password").isLength({
          min: 6
      })
    ];
  return next();
  } catch (error) {
    console.log(error);
  }
}
router.post('/signup', signupMiddleware, usersignup);

module.exports = router;