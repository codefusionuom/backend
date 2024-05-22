module.exports = (sequelize, Sequelize) => {
  const employee = sequelize.define("employee", {
    empId: {
      type: Sequelize.INTEGER,
      unique: true,
      allowNull: false,
      // autoIncrement: true,
    },
    empName: {
      type: Sequelize.STRING
    },
    empAdd: {
      type: Sequelize.STRING
    },
    empType: {
      type: Sequelize.STRING
    },
    empSalary: {
      type: Sequelize.INTEGER
    },
    empDepartment: {
      type: Sequelize.STRING
    },
    empNumber: {
      type: Sequelize.STRING,
      unique: true,
      allowNull: false,
    }
  });
  return employee;
};
