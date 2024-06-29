module.exports = (sequelize, Sequelize) => {
  const employees = sequelize.define("employees", {
    empName: {
      type: Sequelize.STRING
    },
    empAdd: {
      type: Sequelize.STRING
    },
    empType: {
      type: Sequelize.STRING
    },
    empDepartment: {
      type: Sequelize.STRING
    },
    empNumber: {
      type: Sequelize.STRING,
      unique: true,
      allowNull: false,
    },
    empEmail: {
      type: Sequelize.STRING,
      allowNull: false,
    },
  });
  return employees;
};
