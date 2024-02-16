const express =require('express')
const router = express.Router();
const {  } = require('./tutorial');
const { createEmployees, getEmployees, updateEmployees, deleteEmployees, getEmployeesList, searchEmp } = require('../../../controller/studioSide/employeeManager/employee');
const { getAttendanceCurrent, getAttendance, createAttendance, searchAttendanceID, searchAttendanceType } = require('../../../controller/studioSide/employeeManager/attendance');
const { createPayment, getPayment, updatePayment, deletePayment, createAdvance, getAdvance, deleteAdvance } = require('../../../controller/studioSide/employeeManager/payment');
const { getEventNo, getEmpNo, getPhotoNo} = require('../../../controller/studioSide/employeeManager/dash')


// employee
router.get("/customer/",getEmployees );
router.put("/customer/:id",updateEmployees );
router.delete("/customer/:id", deleteEmployees);
router.get("/customer/?search", searchEmp);
router.get("/customer/",getEmployeesList );
router.put("/customer/:id",getEmpNo );
router.delete("/customer/:id", getEventNo);
router.get("/customer/?search", getPhotoNo);
router.post("/employee", createEmployees);


//attendance
router.get("/attendance/", getAttendanceCurrent);
router.get("/attendance/", getAttendance);
router.post("/attendance/",createAttendance);
router.get("/attendance/", searchAttendanceID);
router.get("attendance/", searchAttendanceType);

//payment
router.post("payment/", createPayment);
router.get("payment/", getPayment);
router.put("payment/", updatePayment);
router.delete("payment/", deletePayment);
router.post("payment/", createAdvance);
router.get("payment/", getAdvance);
router.delete("payment/", deleteAdvance);

// router.post("/tutorialCreate", create)

module.exports =router ;