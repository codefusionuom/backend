const express = require('express');
const router = express.Router();
const { check } = require('express-validator');

const {
  user_forgotPassword,
  user_resetPassword,
} = require('../controller/userController');

router.post('/foggotPassword', user_forgotPassword);

module.exports = router;


