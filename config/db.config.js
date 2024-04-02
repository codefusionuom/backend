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

// db.tutorials = require("./turorial.model")(sequelize, Sequelize);
// db.customers=require("../model/customer/customer.model")(sequelize, Sequelize)
// db.customerPayments=require("../model/customer/payment.model")(sequelize, Sequelize)


// const customers = sequelize.define("customers", {
//   firstname: {
//     type: Sequelize.STRING
//   },
//   lastname: {
//     type: Sequelize.STRING
//   },
//   email: {
//     type: Sequelize.STRING,
//     unique: 'uniqueTag',
//   },
//   mobilePhone: {
//     type: Sequelize.STRING,
//     unique: 'uniqueTag',
//   },
//   address: {
//     type: Sequelize.STRING
//   },
//   status: {
//     type: Sequelize.BOOLEAN
//   }
// });




// const customerPayments = sequelize.define("customerPayments", {
//   customerId: {
//     type: Sequelize.INTEGER,
//     references: {
//         model: "customers", 
//         key: 'id'
//       } 
//   },
//   description: {
//     type: Sequelize.STRING
//   },
//   amount: {
//     type: Sequelize.FLOAT,
//   },
//   offers: {
//     type: Sequelize.FLOAT,
//   },
//   payment: {
//     type: Sequelize.FLOAT,
//   },
//   status: {
//     type: Sequelize.STRING
//   },
//   type: {
//     type: Sequelize.STRING
//   }
// });

// customers.hasMany(customerPayments);
// customerPayments.belongsTo(customers);
const customers=require("../model/customer/customer.model")(sequelize, Sequelize)
const customerPayments=require("../model/customer/payment.model")(sequelize, Sequelize)


customers.hasMany(customerPayments);
customerPayments.belongsTo(customers);

db.customers=customers
db.customerPayments=customerPayments

const event = require("../model/eventManager/event.model")(sequelize, Sequelize)
const task = require("../model/eventManager/task.model")(sequelize, Sequelize)

db.event = event
db.task = task



/////// EmployeeManager

const employee = require("../model/employeeManager/employee.model")(sequelize,Sequelize)
const employeePaymentDetails = require("../model/employeeManager/employeePaymentDetails.model")(sequelize,Sequelize)
const attendance = require("../model/employeeManager/attendance.model")(sequelize,Sequelize)

/// 1:M
employee.hasMany(attendance, { foreignKey: 'id' });
attendance.belongsTo(employee, { foreignKey: 'id' });

///1:1
// employeePaymentDetails.belongsTo(employee, { foreignKey: 'id' });
// employee.hasOne(employeePaymentDetails, { foreignKey: 'id' });




db.employee = employee
db.employeePaymentDetails = employeePaymentDetails
db.attendance = attendance




///////



module.exports = db;