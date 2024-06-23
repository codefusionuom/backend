module.exports = (sequelize, Sequelize) => {
  const eventRequestServices = sequelize.define("eventRequestServices", {
    eventRequestId: {
      type: Sequelize.INTEGER,
      references: {
        model: "eventRequests",
        key: "id", 
      },
    },
    serviceId: {
      type: Sequelize.INTEGER,
      references: {
        model: "services",
        key: "id", 
      },
    },
    serviceDate: {
      type: Sequelize.STRING,
    },
    note: {
      type: Sequelize.STRING,
    },
    amount: {
      type: Sequelize.REAL,
    },
    offers: {
      type: Sequelize.REAL,
    },
    payment: {
      type: Sequelize.REAL,
    },
  });
  return eventRequestServices;
};
