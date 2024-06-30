const express = require('express');
const asyncHandler = require('express-async-handler');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const db = require('../config/db.config');
const Admin = db.admin;
const Employee = db.employees
const { validationResult } = require('express-validator');


// @route    get admin/auth
// @desc     load user relevent to token
exports.getCurruntAdmin = asyncHandler(async (req, res) => {
  try {
    // console.log('++++++++++++++++++++',req.admin);
    if (!req.admin) {
      return res.status(404).json({ message: 'Admin not found' });
    }
    // const data = await Admin.findByPk(req.admin.id, {
    //   attributes: { exclude: ['password'] },
    // });
    const data = await Admin.findByPk(req.admin.id, {
      include: Employee,
      attributes: { exclude: ['password'] },
    });
    if (!data) {
      return res.status(404).json({ message: 'Admin not found' });
    }

    // console.log('+++++++++++++++++++++++++',data.employee);
    res.status(200).json(data);
  } catch (error) {
    res.status(400);
    throw new Error(error.message || "can't load Admin");
  }
});

// @route    POST admin/auth
// @desc     Authenticate user & get token

exports.login = asyncHandler(async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const { email, password } = req.body;
  // console.log('++++++++++++++++++++++++++++++++',email,password);
  // Check if admin exists

  const employee = await Employee.findOne({ where: { empEmail: email } });

  // console.log('++++++++++++++++++++++++++++',employee);
  const admin = await Admin.findOne({ where: { empId:employee.id } });
  // console.log('++++++++++++++++++++++++++++', admin);

  if (!employee) {
    return res.status(400).json({ message: 'Invalid credentials' });
  }
  if (!admin) {
    return res.status(400).json({ message: 'Access denied' });
  }

  // Check if password matches
  const isMatch = await bcrypt.compare(password, admin.password);

  if (!isMatch) {
    return res.status(400).json({ message: 'Invalid credentials' });
  }
  // Create JWT token
  const payload = {
    admin: {
      id: admin.empId,
      privileges: admin.privilege,
    },
  };

  jwt.sign(
    payload,
    process.env.JWT_SECRET,
    { expiresIn: '5 days' },
    (err, token) => {
      if (err) throw err;
      res.json({ token });
    }
  );
});
