module.exports = (sequelize, Sequelize) => {
    const eventRequests = sequelize.define("eventRequests", {
        customerId: {
            type: Sequelize.INTEGER,
            references: {
                model: "customers",
                key: 'id', // Specify ON UPDATE NO ACTION
              } 
          },
        note: {
            type: Sequelize.STRING,
          }
    });
      return eventRequests
    };