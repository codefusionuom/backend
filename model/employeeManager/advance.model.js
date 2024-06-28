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
      monthtaken: {
        type: Sequelize.INTEGER,
      },
      advancerequest: {
        type: Sequelize.BOOLEAN, //1 - is a request, 0- not a request.
      }
    });
    return advance;
  };
  