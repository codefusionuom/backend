const Sequelize = require('sequelize');
require('dotenv').config();

const server = process.env.AZURE_SQL_SERVER;
const database = process.env.AZURE_SQL_DATABASE;
const port = 1433;
const type = process.env.AZURE_SQL_AUTHENTICATIONTYPE;
const user = process.env.AZURE_SQL_USERNAME;
const password = process.env.AZURE_SQL_PASSWORD;


const sequelize = new Sequelize(database, user, password, {
  host: server, 
  port: port,
  dialect: 'mssql',
  logging: console.log,
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

const customers = require('../model/customer/customer.model')(
  sequelize,
  Sequelize
);
const customerPayments = require('../model/customer/payment.model')(
  sequelize,
  Sequelize
);
const admin = require('../model/superAdmin/admin.model')(sequelize, Sequelize);

customers.hasMany(customerPayments);
customerPayments.belongsTo(customers);

db.customers = customers;
db.customerPayments = customerPayments;

db.admin = admin;

module.exports = db;
