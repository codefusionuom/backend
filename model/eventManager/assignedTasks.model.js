
module.exports = (sequelize, Sequelize) => {
  
    const assignedTasks = sequelize.define("assignedTasks", {
      eventId: {
        type: Sequelize.STRING
      },
      empId: {
        type: Sequelize.INTEGER,
        unique: true,
        primaryKey: true
        // autoIncrement: true,
      },
      taskId: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        primaryKey: true
      },
    });
      return assignedTasks;
    };