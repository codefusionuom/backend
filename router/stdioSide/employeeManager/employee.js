const express =require('express');
const { createEmployee, getEmployees, getEmployeeByid, updateEmployee, deleteEmplloyee, deleteEmployee } = require('../../../controller/studioSide/employeeManager/employee');
const { createEmployeePaymentDetails, getEmployeePaymentDetailsByid, updateEmployeePaymentDatails } = require('../../../controller/studioSide/employeeManager/employeePaymentDetails');
const { createAttendance, getAttendance } = require('../../../controller/studioSide/employeeManager/attendance');
const router = express.Router();

//// Employee

router.post("/registerEmployee", createEmployee);
router.get("/getEmployees", getEmployees);
router.get("/getEmployeeByid/:id", getEmployeeByid);
router.put("/updateEmployee/:id", updateEmployee);
router.delete("/deleteEmployee/:id",deleteEmplloyee);
// router.delete("/deleteEmployee/:id",deleteEmployee);

////// Payment

router.post("/registerEmployeePaymentDetails", createEmployeePaymentDetails);
router.get("/getEmployeePaymentDetailsByid/:id", getEmployeePaymentDetailsByid);
router.put("/updateEmployeePaymentDatails/:id", updateEmployeePaymentDatails);


//// Attendance

router.post("/createAttendance", createAttendance);
router.get("/getAttendance", getAttendance);







module.exports =router ;