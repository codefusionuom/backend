module.exports = (sequelize, Sequelize) => {
    const employees = sequelize.define("employees", {
      empid: {
        type: Sequelize.STRING,
        unique: 'uniqueTag',
      },
      empname: {
        type: Sequelize.STRING
      },
      empaddress: {
        type: Sequelize.STRING
      },
      type: {
        type: Sequelize.STRING
      },
      basicsal: {
        type: Sequelize.STRING
      },
      department: {
        type: Sequelize.STRING
      },
      contact: {
        type: Sequelize.BOOLEAN
      }
    });
      return customers
    };