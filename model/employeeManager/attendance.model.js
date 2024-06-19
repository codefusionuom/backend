module.exports = (sequelize, Sequelize) => {
    const attendance = sequelize.define("attendance", {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        // autoIncrement: true,
      },
      date: {
        type: Sequelize.DATE,
        primaryKey: true,
      },
      // checkIn: {
      //   type: Sequelize.INTEGER
      // },
      // checkOut: {
      //   type: Sequelize.INTEGER
      // },
      checkIn: {
        type: Sequelize.TIME
      },
      checkOut: {
        type: Sequelize.TIME
      },
      dayType: {
        type: Sequelize.STRING
      },
      leaveType: {
        type: Sequelize.STRING
      }
    });
    return attendance;
  };
  