const asyncHandler = require('express-async-handler');
const db = require('../../../config/db.config');
const bcrypt = require('bcryptjs'); //bcrypt: This is a library for hashing passwords.
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const config = require('config');
const Admin = db.admin;
require('dotenv').config();

exports.createAdmin = asyncHandler(async (req, res) => {
  const { employeeName, employeeId, address, telephone, privileges, password } =
    req.body; //destructuring

  if (employeeId) {
    console.log('old admin');
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
    };

    const data = await Admin.create(admin); //create new addmin record

    //encript password
    const salt = await bcrypt.genSalt(10); //genSalt: This method generates a salt, which is a random value added to the password before hashing to ensure that identical passwords have different hashes.

    admin.password = await bcrypt.hash(password, salt); //bcrypt.hash: This method takes the plain text password and the generated salt, and returns a hashed version of the password
    await Admin.update(
      { password: admin.password },
      { where: { id: data.id } }
    );

    //jwt authentication
    const payload = {
      //payload is an object that contains the data want to include in the JWT.
      admin: {
        id: data.id,
      },
    };

    const token = jwt.sign(
      //This method from the jsonwebtoken library creates a new JWT
      payload,
      process.env.JWT_SECRET,
      { expiresIn: '5 days' }
    );

    res
      .cookie('cookie', token, { httpOnly: true }) //means the cookie is only accessible by the web server and not by JavaScript running in the browser. This helps prevent XSS (Cross-Site Scripting) attacks.
      .status(201)
      .json({ message: 'Admin registered', token });
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
    res.status(200).json(data);
  } catch (error) {
    res.status(400);
    throw new Error(error.message || "can't get Admins");
  }
});

exports.getAdminByid = asyncHandler(async (req, res) => {
  const { id } = req.params; // Assuming you're passing id as a route parameter
  try {
    const data = await Admin.findByPk(id);
    res.status(200).json(data);
  } catch (error) {
    res.status(400);
    throw new Error(error.message || "can't get Admins");
  }
});
