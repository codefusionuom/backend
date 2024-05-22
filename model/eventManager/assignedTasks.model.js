
module.exports = (sequelize, Sequelize) => {
  
    const assignedTasks = sequelize.define("assignedTasks", {
      eventId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'events',
          key: 'id',  
       }
      },
      empId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'employees',
          key: 'id',  
       }
      },
      taskId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'tasks',
          key: 'id',  
       }
      },
    });
      return assignedTasks;
    };