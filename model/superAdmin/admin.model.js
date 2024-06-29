// module.exports = (sequelize, Sequelize) => {
//   const Admin = sequelize.define('Admin', {
//     privileges: {
//       type: Sequelize.STRING,
//     },
//     password: {
//       type: Sequelize.STRING,
//       allowNull: false,
//     },
//     email: {
//       type: Sequelize.STRING,
//       allowNull: false,
//       unique: true,
//       primaryKey: true,
//     },
//   });
//   return Admin;
// };

module.exports = (sequelize, Sequelize) => {
  const Admin = sequelize.define('Admin', {
    empId: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      references: {
        model: 'employees',
        key: 'id',
      },
    },
    privileges: {
      type: Sequelize.STRING,
    },
    password: {
      type: Sequelize.STRING,
      allowNull: false,
    },
  });
  return Admin;
};

