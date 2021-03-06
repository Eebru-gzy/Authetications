const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { validationResult } = require('express-validator');
const User = require("../model/user");


/**
 * @method - POST
 * @param - /api/signup
 * @description - User SignUp
 */

module.exports = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
      return res.status(400).json({
          errors: errors.array()
      });
  }

  const {
      username,
      email,
      password
  } = req.body;
  try {
      let user = await User.findOne({
          email
      });
      if (user) {
        return res.status(400).json({
            msg: "User Already Exists"
        });
      }

      user = new User({
        username,
        email,
        password
      });

      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);

      await user.save();

      const payload = {
        user: {
            id: user.id
        }
      };

      jwt.sign(
          payload,
          "randomString", {
              expiresIn: 10000
          },
          (err, token) => {
              if (err) throw err;
              res.status(200).json({
                  token
              });
          }
      );
  } catch (err) {
      console.log('>>>>>>>>>>',err.message);
      res.status(500).send("Error in Saving");
  }
}
