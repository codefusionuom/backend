module.exports = (sequelize, Sequelize) => {
    const employeePaymentDetails = sequelize.define("employeePaymentDetails", {
      id: {
        type: Sequelize.INTEGER,
        unique: true,
        allowNull: false,
        primaryKey: true,
      },
      bank: {
        type: Sequelize.STRING
      },
      epfNumber: {
        type: Sequelize.STRING,
        unique: true,
      },
      accountNumber: {
        type: Sequelize.STRING,
        unique: true,
      },
      overtimeRate: {
        type: Sequelize.INTEGER
      },
      doubleovertimeRate: {
        type: Sequelize.INTEGER
      }
    });
    return employeePaymentDetails;
  };
  