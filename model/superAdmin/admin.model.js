module.exports = (sequelize, Sequelize) => {
  const Admin = sequelize.define("Admin", {
    employeeName: {
      type: Sequelize.STRING,
    },
    employeeId: {
      type: Sequelize.STRING,
      unique: true,
    },
    address: {
      type: Sequelize.STRING,
    },
    telephone: {
      type: Sequelize.INTEGER,
    },
    privileges: {
      type: Sequelize.STRING,
    },
  });
  return Admin;
};
