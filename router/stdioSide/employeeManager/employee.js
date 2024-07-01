const express =require('express');
const { createEmployee, getEmployees, getEmployeeByid, updateEmployee, deleteEmplloyee, deleteEmployee, getEmployeesandSearch, getEmployeeSearch } = require('../../../controller/studioSide/employeeManager/employee');
const { createEmployeePaymentDetails, getEmployeePaymentDetailsByid, updateEmployeePaymentDatails } = require('../../../controller/studioSide/employeeManager/employeePaymentDetails');
const { createAttendance, getAttendance, getCheckInTotal, getCheckOutTotal, getAttendanceandSearch } = require('../../../controller/studioSide/employeeManager/attendance');
const { createAllowanceDeduction, getAllowance, deleteAllowance, getAllowanceByType, createEmpAllowance, getEmpAllowanceandSearch, getempAllowance, getEmpAllowanceByid, updateEmpAllowance} = require('../../../controller/studioSide/employeeManager/allowanceDeduction');
const { createAdvance, getAdvance, getAdvanceByid, updateAdvance, acceptAdvance, rejectAdvance, getRejectAdvance } = require('../../../controller/studioSide/employeeManager/advance');
// const { createAdvance, getAdvance, getAdvanceByid, updateAdvance, } = require("../../../controller/studioSide/employeeManager/payment")
const router = express.Router();

//// Employee

router.post("/registerEmployee", createEmployee);
router.get("/getEmployees", getEmployees);
router.get("/getEmployeeByid/:id", getEmployeeByid);
router.put("/updateEmployee/:id", updateEmployee);
router.delete("/deleteEmployee/:id",deleteEmplloyee);
// router.delete("/deleteEmployee/:id",deleteEmployee);
router.get("/getEmployeesandSearch", getEmployeesandSearch);
router.get("/getEmployeeSearch", getEmployeeSearch);

////// Payment

router.post("/registerEmployeePaymentDetails", createEmployeePaymentDetails);
router.get("/getEmployeePaymentDetailsByid/:id", getEmployeePaymentDetailsByid);
router.put("/updateEmployeePaymentDatails/:id", updateEmployeePaymentDatails);

//Advance

router.post("/createAdvance", createAdvance);
router.get("/getAdvance",getAdvance);
router.get("/getAdvanceByid/:id", getAdvanceByid);
router.put("/updateAdvance/:id", updateAdvance);
router.put("/acceptAdvance/:id", acceptAdvance);
router.put("/rejectAdvance/:id", rejectAdvance);
router.get("/getRejectAdvance", getRejectAdvance);


// Allowance
router.post("/createAllowanceDeduction", createAllowanceDeduction);
router.get("/getAllowance", getAllowance);
router.delete("/deleteAllowance/:id", deleteAllowance);
router.get("/getAllowanceByType", getAllowanceByType);
router.post("/createEmpAllowance", createEmpAllowance);


//// EmpAllowance
router.get("/getEmpAllowanceandSearch", getEmpAllowanceandSearch);
router.get("/getEmpAllowance", getempAllowance);
router.get("/getEmpAllowanceByid", getEmpAllowanceByid);
router.put("/updateEmpAllowance", updateEmpAllowance);




//// Attendance

router.post("/createAttendance", createAttendance);
router.get("/getAttendance", getAttendance);
router.get("/getCheckInTotal", getCheckInTotal);
router.get("/getCheckOutTotal", getCheckOutTotal);
router.get("/getAttendanceandSearch", getAttendanceandSearch);









module.exports =router ;