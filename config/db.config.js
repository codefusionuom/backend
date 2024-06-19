const server = process.env.AZURE_SQL_SERVER
const database =process.env.AZURE_SQL_DATABASE
const port =1433
const type = process.env.AZURE_SQL_AUTHENTICATIONTYPE;
const user = process.env.AZURE_SQL_USERNAME
const password =process.env.AZURE_SQL_PASSWORD


const Sequelize = require("sequelize");
const sequelize = new Sequelize(database, user, password, {
  host: server,
  port: port,
  dialect: "mssql",
  logging: console.log,
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  
  },
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;


const customers=require("../model/customer/customer.model")(sequelize, Sequelize)
const customerPayments=require("../model/customer/payment.model")(sequelize, Sequelize)
const customerRequests=require("../model/customer/customerRequest.model")(sequelize, Sequelize)
const customerServices=require("../model/customer/customerService.model")(sequelize, Sequelize)


const events = require("../model/eventManager/event.model")(sequelize, Sequelize)
const task = require("../model/eventManager/task.model")(sequelize, Sequelize)

// customers.hasMany(customerPayments);
// customerPayments.belongsTo(customers);
customerServices.belongsTo(customerServices, { as: 'parent', foreignKey: 'parentService' });

customers.hasMany(events);
events.belongsTo(customers);

events.hasMany(customerPayments);
customerPayments.belongsTo(events);


db.customers=customers
db.customerPayments=customerPayments
db.customerRequests=customerRequests
db.customerServices=customerServices

db.events = events
db.task = task



/////// EmployeeManager

const employee = require("../model/employeeManager/employee.model")(sequelize,Sequelize)
const employeePaymentDetails = require("../model/employeeManager/employeePaymentDetails.model")(sequelize,Sequelize)
const attendance = require("../model/employeeManager/attendance.model")(sequelize,Sequelize)
const paymentAllowanceDeduction = require("../model/employeeManager/paymentAllowanceDeduction.model")(sequelize,Sequelize)
const advance = require("../model/employeeManager/advance.model")(sequelize,Sequelize)

/// 1:M
employee.hasMany(attendance, { foreignKey: 'id' });
attendance.belongsTo(employee, { foreignKey: 'id' });

employee.hasMany(advance, {foreignKey: 'empId'});
advance.belongsTo(employee, {foreignKey: 'id'});

///1:1
// employeePaymentDetails.belongsTo(employee, { foreignKey: 'id' });
// employee.hasOne(employeePaymentDetails, { foreignKey: 'id' });



db.paymentAllowanceDeduction = paymentAllowanceDeduction
db.employees = employee
db.employeePaymentDetails = employeePaymentDetails
db.attendance = attendance
db.advance = advance




///////





module.exports = db;