module.exports = (sequelize, Sequelize) => {
  const employees = sequelize.define("employees", {
    // empId: {
    //   type: DataTypes.INTEGER,
    //   allowNull: false,
    //   // Define a setter to ensure duplicate_id always mirrors id
    //   set(value) {
    //     this.setDataValue('empId', this.id);
    //   }
    // },
    // empId: {
    //   type: Sequelize.INTEGER,
    //   unique: true,
    //   allowNull: true,
    // },
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
  return employees;
};
