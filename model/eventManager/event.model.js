const { ENUM } = require("sequelize");

module.exports = (sequelize, Sequelize) => {
  
    const event = sequelize.define("event", {
      eventId: {
        type: Sequelize.STRING
      },
      serviceType: {
        type: Sequelize.ENUM,
        values: ['one day services' , 'wedding photography']
      },
      status: {
        type: Sequelize.ENUM,
        values: ['Offline', 'Upcoming ','Desertion', 'Done' , 'Active']
      },
      date: {
        // type: Sequelize.STRING,
        type: Sequelize.DATE,
        // unique: 'uniqueTag',
      },
      customerId: {
        type: Sequelize.INTEGER,
        references: {
            model: "customers", 
            key: 'id'
          } 
      },
      // eventDetails: {

      // }
    });
      return event
    };