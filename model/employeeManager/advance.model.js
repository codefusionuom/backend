module.exports = (sequelize, Sequelize) => {
    const advance = sequelize.define("advance", {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      empId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        references: {
            model: 'employees', // name of the target table
            key: 'id', // key in the target table that we're referencing
        },
      },
      advanceAmount: {
        type: Sequelize.INTEGER,
      },
      advancePaidAmount: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      advancePaidStatus: {
        type: Sequelize.BOOLEAN,
        //1-Paid, 0-Not paid
      }
    });
    return advance;
  };
  