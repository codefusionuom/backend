const express = require('express');
const router = express.Router();
const { check } = require('express-validator');

const { verifyAuth } = require('../../../middleware/auth');
const {
  getAdmin,
  updateAdmin,
  createAdmin,
  deleteAdmin,
  getAdminByid,
} = require('../../../controller/studioSide/superAdmin/admin');
const { getCurruntAdmin, login } = require('../../../controller/auth');
const {
  getDepartment,
  updateDepartment,
  createDepartment,
  deleteDepartment,
  getDepartmentByid,
} = require('../../../controller/studioSide/superAdmin/department');

// admin
//register
router.post('/admin', createAdmin);

//auth
router.get('/admin/auth', verifyAuth, getCurruntAdmin);
router.post(
  '/admin/auth',
  [
    check('username', 'username is required').exists(),
    check('password', 'Password is required').exists(),
  ],
  login
);

router.get('/admin/:page', getAdmin);
router.put('/admin/:id', updateAdmin);
router.delete('/admin/:id', deleteAdmin);
router.get('/adminId/:id', getAdminByid);
router.get('/admin/?search');

//department
router.get('/departmrnt/:page', getDepartment);
router.put('/department/:id', updateDepartment);
router.post('/department', createDepartment);
router.delete('/departmentd/:id', deleteDepartment);
router.get('/departmentId/:id', getDepartmentByid);
router.get('/department/?search');

// payments
router.get('/payments/:page');
router.get('/payment');
router.get('/payment/:id');

router.get('/sales/:id');
router.get('/customer/:id');
router.get('/event/:id');
router.get('/order/:id');

module.exports = router;
