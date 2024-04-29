

module.exports = (sequelize, Sequelize) => {
    const task = sequelize.define("task", {
      eventId: {
        type: Sequelize.STRING
      },
      taskName:{
        type:Sequelize.STRING,
      },
      taskId: {
        type: Sequelize.INTEGER,
        // unique: 'uniqueTag',
        primaryKey: true,
        autoIncrement: true
      },
      serviceType: {
        type: Sequelize.ENUM,
        values: ['editing' , 'photography' , 'one day services']
      },
      department: {
        type: Sequelize.ENUM,
        values: ['editing' , 'photography']
      },
      status: {
        type: Sequelize.ENUM,
        values: ['Active', 'Upcoming ','Desertion', 'Done']
      },
      description: {
        type: Sequelize.STRING
      }
    });
      return task
    };