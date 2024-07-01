const asyncHandler = require('express-async-handler');
const db = require('../config/db.config');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const nodemailer = require('nodemailer');
// const {
//   FORGOT_PASSWORD_MODEL,
//   RESET_PASSWORD_MODEL,
// } = require('../utility/joi');
// const AppError = require('../utils/error');
const { check, validationResult } = require('express-validator');

// const User = db.user;
const Admin = db.admin;
const Employee = db.employees;
const User = db.users;

// Function to check if an object is empty
const isEmpty = (obj) => {
  for (var prop in obj) {
    if (obj.hasOwnProperty(prop)) return false;
  }
  return JSON.stringify(obj) === JSON.stringify({});
};

// Forgot Password
exports.user_forgotPassword = asyncHandler(async (req, res, next) => {
  // if (isEmpty(req.body)) return next(new AppError('Form data not found', 400));

  // const { error } = FORGOT_PASSWORD_MODEL.validate(req.body);
  // if (error) return next(new AppError(error.details[0].message, 400));

  const { email } = req.body;
  const employee = await Employee.findOne({ where: { empEmail:email } });
  if (!employee) {
    // return next(new AppError('User not found', 400));
    return res
      .status(400)
      .send({ message: 'No employee found with this email' });
  }

  const empId=employee.id;
  // console.log('===============================',employee.id);
  // console.log('===============================',empId);

  const otp = Math.floor(1000 + Math.random() * 9000);
  const otpExpire = new Date();
  otpExpire.setMinutes(otpExpire.getMinutes() + 1);

   const [user, created] = await User.findOrCreate({
     where: { empId },
     defaults: {
       empId,
       otp,
       otpExpire,
     },
   });

  //  console.log(user);
  //  console.log(created);

  const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: 'anonymousshield014@gmail.com',
      pass: 'ugqa dhrk zyze rneq',
    },
  });

  const mailOptions = {
    from: 'anonymousshield014@gmail.com',
    to: email,
    subject: 'Password reset OTP',
    text: `Your OTP (It is expired after 1 min) : ${otp}`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      // return next(new AppError(error.message, 500));
      res
        .status(400)
        .send({ error });
    } else {
      res.json({ data: 'Your OTP has been sent to the email' });
    }
  });
});

// Reset Password
exports.user_resetPassword = asyncHandler(async (req, res, next) => {
  const { password, confirmPassword, otp } = req.body;
  // if (isEmpty(req.body)) return next(new AppError('Form data not found', 400));

  const { error } = RESET_PASSWORD_MODEL.validate(req.body);
  if (error) return next(new AppError(error.details[0].message, 400));

  if (password !== confirmPassword)
    return next(new AppError('Passwords do not match', 400));

  const user = await User.findOne({
    where: { otp, otpExpire: { [db.Sequelize.Op.gt]: new Date() } },
  });
  if (!user) return next(new AppError('Invalid or expired OTP', 400));

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  await User.update(
    { password: hashedPassword, otp: null, otpExpire: null },
    { where: { otp } }
  );

  res.json({ data: 'Password reset successful' });
});
