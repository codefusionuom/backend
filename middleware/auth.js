const jwt = require("jsonwebtoken");
// const User = require("../models/userModel.js");
const asyncHandler = require("express-async-handler");
require('dotenv').config();

exports.verifyAuth = asyncHandler(async (req, res, next) => {
console.log('verifuAuth triggered');
  // Get token from header
  const token = req.header('x-auth-token'); // This retrieves the token from the request header named x-auth-token.

  // if (
  //   req.headers.authorization &&
  //   req.headers.authorization.startsWith("Bearer")
  // ) {
  //   try {
  //     token = req.headers.authorization.split(" ")[1];
  //     const decoded = jwt.verify(token, process.env.JWT_SECRET);
  //     req.user = decoded

  //     next();
  //   } catch (error) {
  //     res.status(401);
  //     throw new Error("Not authorized, token failed");
  //   }
  // }

  // if (!token) {
  //   res.status(401);
  //   throw new Error("Not authorized, no token");
  // }

  if (!token) {
    return res.status(401).json({ message: 'No token, authorization denied' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log('decoded - ',decoded);
    req.admin = decoded.admin;
    console.log('req.admin - ',req.admin);
    next();
  } catch (err) {
    console.error('something wrong with auth middleware');
    res.status(401).json({ message: 'Token is not valid',err });
  }
});

