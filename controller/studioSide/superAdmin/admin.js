const asyncHandler = require('express-async-handler');
const db = require('../../../config/db.config');
const bcrypt = require('bcryptjs'); //bcrypt: This is a library for hashing passwords.
const jwt = require('jsonwebtoken');
const config = require('config');
const Admin = db.admin;
require('dotenv').config();

exports.createAdmin = asyncHandler(async (req, res) => {
  const { employeeName, employeeId, address, telephone, privileges, password,email } =
    req.body; //destructuring
  if (employeeId) {
    const oldAdmin = await Admin.findOne({
      where: { employeeId: employeeId },
    });

    if (oldAdmin) {
      res.status(400).send({ message: 'admin already exist' });
      return;
    }
  } else {
    res.status(400).send({ message: 'Admin required employee id' });
    return;
  }

  try {
    const admin = {
      employeeName,
      employeeId,
      address,
      telephone,
      privileges,
      password,
      email
    };

    const data = await Admin.create(admin); //create new addmin record

    //encript password
    const salt = await bcrypt.genSalt(10); //genSalt: This method generates a salt, which is a random value added to the password before hashing to ensure that identical passwords have different hashes.

    admin.password = await bcrypt.hash(password, salt); //bcrypt.hash: This method takes the plain text password and the generated salt, and returns a hashed version of the password
    await Admin.update(
      { password: admin.password },
      { where: { id: data.id } }
    );

    res.status(201).json({ message: 'Admin registered' });
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
    const data = await Admin.findAndCountAll({});
    res.status(200).json(data.rows);
  } catch (error) {
    res.status(400);
    throw new Error(error.message || "can't get Admins");
  }
});
