module.exports = (sequelize, Sequelize) => {
  const Admin = sequelize.define('Admin', {
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
    password: {
      type: Sequelize.STRING,
      allowNull: false, // Password is required
    },
    username: {
      type: Sequelize.STRING,
      allowNull: false, // username is required
    },
  });
  return Admin;
};
