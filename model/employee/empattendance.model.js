module.exports = (sequelize, Sequelize) => {
    const empattendance = sequelize.define("empattendance", {
      date: {
        type: Sequelize.STRING
      },
      day: {
        type: Sequelize.STRING
      },
      empid: {
        type: Sequelize.STRING,
        unique: 'uniqueTag',
      },
      chin: {
        type: Sequelize.STRING
      },
      chout: {
        type: Sequelize.STRING
      },
      workhours: {
        type: Sequelize.STRING
      },
      status: {
        type: Sequelize.STRING
      }
    });
      return customers
    };