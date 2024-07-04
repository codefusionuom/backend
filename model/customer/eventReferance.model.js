module.exports = (sequelize, Sequelize) => {
  const eventReferences = sequelize.define("eventReferences", {
    eventId: {
      type: Sequelize.INTEGER,
      references: {
        model: "events",
        key: "id", // Specify ON UPDATE NO ACTION
      },
    },
    referenceNumber: {
      type: Sequelize.STRING,
    },
    email: {
      type: Sequelize.STRING,
    },
  });
  return eventReferences;
};
