const asyncHandler = require("express-async-handler"); // imports the asyncHandler middleware function from the express-async-handler package.
const db = require("../../../config/db.config");
const Admin = db.admin;

exports.createAdmin = asyncHandler(async (req, res) => {
  const { employeeName, employeeId, address, telephone, privileges } = req.body; //destructuring

  console.log(employeeName);
  console.log(employeeId);
  console.log(address);
  console.log(telephone);
  console.log(privileges);
  //Checking for Existing Admin from id and phone number
  if (employeeId) {
    console.log( "old admin");
    const oldAdmin = await Admin.findOne({
      where: { employeeId: employeeId },
    });
    if (oldAdmin) {
      res.status(400).send({ message: "admin already exist" });
      return;
    }
  }  else {
    res
      .status(400)
      .send({ message: "Admin required employee id" });
    return;
  }


  try {
    // const privilegesString = JSON.stringify(privileges);

    const admin = {
      employeeName,
      employeeId,
      address,
      telephone,
      privileges,
      // privileges: privilegesString,
    };

    const data = await Admin.create(admin); //create new addmin record
    res.status(200).json(data);
  } catch (error) {
    res.status(400);
    throw new Error(
      error.message || "Some error occurred while creating Admin"
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
  // const page = req.params.page; //The page number is extracted from the request parameters
  // let limit = 4; // maximum of 4 admin records will be retrieved per request
  // let offset = limit * (page - 1);
  try {
    const data = await Admin.findAndCountAll({
      // const privilegesArray = JSON.parse(admin.privileges);
      //retrieve admin data
      // limit: limit,
      // offset: offset,
    });
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
