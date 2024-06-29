const asyncHandler = require('express-async-handler');
const db = require('../../../config/db.config');
const bcrypt = require('bcryptjs'); //bcrypt: This is a library for hashing passwords.
const jwt = require('jsonwebtoken');
const config = require('config');
const Admin = db.admin;
const Employee=db.employees;
require('dotenv').config();


exports.createAdmin = asyncHandler(async (req, res) => {
  // console.log(req.body);
  const { privileges, password,email } =req.body;
  // if (email) {
  //   const oldAdmin = await Admin.findOne({
  //     where: { email: email },
  //   });

  //   if (oldAdmin) {
  //     res.status(400).send({ message: 'admin already exist' });
  //     return;
  //   }
  // } else {
  //   res.status(400).send({ message: 'Admin required email' });
  //   return;
  // }

  const employee = await Employee.findOne({ where: { empEmail: email } });

  console.log('++++++++++++++++++++',employee);
  if (!employee) {
    return res
      .status(400)
      .send({ message: 'No employee found with this email' });
  }

  try {
    const salt = await bcrypt.genSalt(10); //genSalt: This method generates a salt, which is a random value added to the password before hashing to ensure that identical passwords have different hashes.
    hashedPassword = await bcrypt.hash(password, salt); //bcrypt.hash: This method takes the plain text password and the generated salt, and returns a hashed version of the password

     const admin = {
      empId:employee.id,
       privileges,
       password: hashedPassword,
      //  email,
     };

    const data = await Admin.create(admin);

    res.status(201).json({ message: 'Admin registered',data });
  } catch (error) {
    res.status(400);
    throw new Error(
      error.message || 'Some error occurred while creating Admin'
    );
  }
});

exports.deleteAdmin = asyncHandler(async (req, res) => {
  const id = req.params.id; //Extracting Admin ID from Request Parameters
  if (!id) {
    res.status(400).send({ message: "can't remove ,invalid Admin" });
    return;
  }
  try {
    const data = await Admin.destroy({
      where: { id: id },
      returning: true,
    });
    res.status(200).json(data);
  } catch (error) {
    res.status(400);
    throw new Error(error.message || "can't remove Admin");
  }
});

exports.updateAdmin = asyncHandler(async (req, res) => {
  const id = req.params.id;
  console.log(id, req.body);
  try {
    const data = await Admin.update(req.body, {
      where: { id: id },
      returning: true,
    });
    res.status(200).json(data);
  } catch (error) {
    res.status(400);
    throw new Error(error.message || "can't update Admin");
  }
});

exports.getAdmin = asyncHandler(async (req, res) => {
  try {
    const data = await Admin.findAll({
      include: Employee
      });
    res.status(200).json(data);
  } catch (error) {
    res.status(400);
    throw new Error(error.message || "can't get Admins");
  }
});

exports.getAdminById = asyncHandler(async (req, res) => {
  try {
    const id = req.params.id;
    // console.log('===================',id);
    if (!id) {
      res.status(400).send({ message: "admin not found" });
      return;
    }
    const data = await Admin.findByPk(id, {
      include: Employee,
      attributes: { exclude: ['password'] },
    });
    // console.log(data);
    res.status(200).json(data);
  } catch (error) {
    res.status(400);
    throw new Error(error.message || "can't get Admin");
  }
});
