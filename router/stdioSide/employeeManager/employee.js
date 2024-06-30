const express =require('express');
const { createEmployee, getEmployees, getEmployeeByid, updateEmployee, deleteEmplloyee, deleteEmployee, getEmployeesandSearch } = require('../../../controller/studioSide/employeeManager/employee');
const { createEmployeePaymentDetails, getEmployeePaymentDetailsByid, updateEmployeePaymentDatails } = require('../../../controller/studioSide/employeeManager/employeePaymentDetails');
const { createAttendance, getAttendance, getCheckInTotal, getCheckOutTotal } = require('../../../controller/studioSide/employeeManager/attendance');
const { createAllowanceDeduction, getAllowance, deleteAllowance } = require('../../../controller/studioSide/employeeManager/allowanceDeduction');
const { createAdvance, getAdvance, getAdvanceByid, updateAdvance, } = require("../../../controller/studioSide/employeeManager/payment")
const router = express.Router();

//// Employee

router.post("/registerEmployee", createEmployee);
router.get("/getEmployees", getEmployees);
router.get("/getEmployeeByid/:id", getEmployeeByid);
router.put("/updateEmployee/:id", updateEmployee);
router.delete("/deleteEmployee/:id",deleteEmplloyee);
router.get("/getEmployeesandSearch", getEmployeesandSearch);
// router.delete("/deleteEmployee/:id",deleteEmployee);

////// Payment

router.post("/registerEmployeePaymentDetails", createEmployeePaymentDetails);
router.get("/getEmployeePaymentDetailsByid/:id", getEmployeePaymentDetailsByid);
router.put("/updateEmployeePaymentDatails/:id", updateEmployeePaymentDatails);
router.post("/createAllowanceDeduction", createAllowanceDeduction);
router.post("/createAdvance", createAdvance);
router.get("/getAdvance",getAdvance);
router.get("/getAdvanceByid/:id", getAdvanceByid);
router.put("/updateAdvance/:id", updateAdvance);
router.get("/getAllowance", getAllowance);
router.delete("/deleteAllowance/:id", deleteAllowance);
router.get("/getCheckInTotal", getCheckInTotal);
router.get("/getCheckOutTotal", getCheckOutTotal);



//// Attendance

router.post("/createAttendance", createAttendance);
router.get("/getAttendance", getAttendance);









module.exports =router ;