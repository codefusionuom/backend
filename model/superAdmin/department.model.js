module.exports = (sequelize, Sequelize) => {
  const Department = sequelize.define("department", {
    departmentId: {
      type: Sequelize.STRING,
      unique: true,
    },
    departmentName: {
      type: Sequelize.STRING,
    },
    departmentHead: {
      type: Sequelize.STRING,
    },
    description: {
      type: Sequelize.STRING,
    },
    departmentEmp: {
      type: Sequelize.STRING,
    },
    departmentItem: {
      type: Sequelize.STRING,
    },
    departmentTask: {
      type: Sequelize.STRING,
    },
  });
  return Department;
};
