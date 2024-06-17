const express = require('express');
const asyncHandler = require('express-async-handler');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
// const { check, validationResult } = require('express-validator');

// @route    get admin/auth
// @desc     load user relevent to token
// @access   public
exports.getCurruntAdmin = asyncHandler(async (req, res) => {
  try {
    const data = await Admin.findById(req.user.id).select('-password');
    res.status(200).json(data);
  } catch (error) {
    res.status(400);
    throw new Error(error.message || "can't load Admin");
  }
});

// @route    POST api/auth
// @desc     Authenticate user & get token
// @access   Public
// router.post(
//   '/',
//   check('email', 'Please include a valid email').isEmail(),
//   check('password', 'Password is required').exists(),
//   async (req, res) => {
//     const errors = validationResult(req);
//     if (!errors.isEmpty()) {
//       return res.status(400).json({ errors: errors.array() });
//     }

//     const { email, password } = req.body;

//     try {
//       let user = await User.findOne({ email });

//       if (!user) {
//         return res
//           .status(400)
//           .json({ errors: [{ msg: 'Invalid Credentials' }] });
//       }

//       const isMatch = await bcrypt.compare(password, user.password); //bcrypt.compare method takes two arguments: the plain text password and the hashed password. It compares the plain text password to the hashed password.

//       if (!isMatch) {
//         return res
//           .status(400)
//           .json({ errors: [{ msg: 'Invalid Credentials' }] });
//       }

//       const payload = {
//         //payload is an object that contains the data want to include in the JWT.
//         user: {
//           id: user.id,
//         },
//       };

//       jwt.sign(
//         //This method from the jsonwebtoken library creates a new JWT
//         payload,
//         config.get('jwtSecret'),
//         { expiresIn: '5 days' },
//         (err, token) => {
//           if (err) throw err;
//           res.json({ token });
//         }
//       );
//     } catch (err) {
//       console.error(err.message);
//       res.status(500).send('Server error');
//     }
//   }
// );
