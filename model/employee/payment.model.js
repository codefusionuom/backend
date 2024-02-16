const customerModel = require("./customer.model");

module.exports = (sequelize, Sequelize) => {
    const empPayments = sequelize.define("empPayments", {
        employeeId: {
          type: Sequelize.INTEGER,
        },
        bank: {
          type: Sequelize.STRING
        },
        epfNo: {
          type: Sequelize.FLOAT,
        },
        accountNo: {
          type: Sequelize.FLOAT,
        },
        basicRate: {
          type: Sequelize.FLOAT,
        },
        otHours: {
          type: Sequelize.STRING
        },
        oth: {
          type: Sequelize.STRING
        },
        hoursWorked: {
          type: Sequelize.STRING
        },
        otAmount: {
          type: Sequelize.FLOAT,
        },
        dovertimehours: {
          type: Sequelize.FLOAT,
        },
        doubleovertimeAmount: {
          type: Sequelize.FLOAT,
        },
        bonus: {
          type: Sequelize.STRING
        },
        oth: {
          type: Sequelize.STRING
        }
      });

    return customerPayments;
  };