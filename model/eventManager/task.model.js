module.exports = (sequelize, Sequelize) => {
    const task = sequelize.define("task", {
      // eventId: {
      //   type: Sequelize.STRING,
      //   // references:{

      //   // },
        
      // },
      taskName:{
        type:Sequelize.STRING,
      },
      // taskId: {
      //   type: Sequelize.STRING,
      //   // unique: 'uniqueTag',
      //   primaryKey: true,
      //   autoIncrement: true
      // },
      // employeesAssigned: {
      //   type: Sequelize.ARRAY(Sequelize.STRING),
      //   allowNull: true,
      // },
      serviceType: {
        type: Sequelize.ENUM,
        values: ['editing' , 'photography']
      },
      department: {
        type: Sequelize.ENUM,
        values: ['editing' , 'photography']
      },
      status: {
        type: Sequelize.ENUM,
        values: [' Active', 'Upcoming ','Desertion', 'Done']
      },
      description: {
        type: Sequelize.STRING
      }
    });
      return task
    };