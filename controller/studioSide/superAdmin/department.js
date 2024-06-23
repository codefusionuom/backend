const asyncHandler = require("express-async-handler");
const db = require("../../../config/db.config");
const Department = db.department;

exports.createDepartment = asyncHandler(async (req, res) => {
  const {
    departmentId,
    departmentName,
    departmentHead,
    description,
    departmentEmp,
    departmentItem,
    departmentTask,
  } = req.body;

  if (departmentId) {
    const oldDepartment = await Department.findOne({
      where: { departmentId: departmentId },
    });
    if (oldDepartment) {
      console.log(oldDepartment);
      res.status(400).send({ message: "Department already exist" });
      return;
    }
  } else {
    res.status(400).send({ message: "Department required name" });
    return;
  }

  try {
    const department = {
      departmentId,
      departmentName,
      departmentHead,
      description,
      departmentEmp,
      departmentItem,
      departmentTask,
    };
    console.log(department);
    const data = await Department.create(department);
    res.status(200).json(data);
  } catch (error) {
    res.status(400);
    throw new Error(
      error.message || "Some error occurred while creating Department"
    );
  }
});

exports.deleteDepartment = asyncHandler(async (req, res) => {
  const id = req.params.id;
  if (!id) {
    res.status(400).send({ message: "can't remove ,invalid Department" });
    return;
  }
  try {
    const data = await Department.destroy({
      where: { departmentId: id },
      where: { id: id },
      returning: true,
    });
    res.status(200).json(data);
  } catch (error) {
    res.status(400);
    throw new Error(error.message || "can't remove Admin");
  }
});

exports.updateDepartment = asyncHandler(async (req, res) => {
  const id = req.params.id;
  console.log(id, req.body);
  try {
    const data = await Department.update(req.body, {
      where: { id: id },
      returning: true,
    });
    res.status(200).json(data);
  } catch (error) {
    res.status(400);
    throw new Error(error.message || "can't update Department");
  }
});

exports.getDepartment = asyncHandler(async (req, res) => {
  const page = req.params.page;
  // let limit = 4; // Adjust limit as needed
  // let offset = limit * (page - 1);
  try {
    const data = await Department
      .findAndCountAll
      // {
      // limit: limit,
      // offset: offset,
      // }
      ();
    res.status(200).json(data);
  } catch (error) {
    res.status(400);
    throw new Error(error.message || "can't get Departments");
  }
});

exports.getDepartmentByid = asyncHandler(async (req, res) => {
  const { id } = req.params; 
  try {
    const data = await Department.findByPk(id);
    res.status(200).json(data);
  } catch (error) {
    res.status(400);
    throw new Error(error.message || "can't get Departments");
  }
});
