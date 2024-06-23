module.exports = (sequelize, Sequelize) => {
    const eventRequestServicesServices = sequelize.define("eventRequestServicesServices", {
      eventRequestServiceId: {
        type: Sequelize.INTEGER,
        references: {
          model: "eventRequestServices",
          key: "id", 
        },
      },
      serviceInputFieldId: {
        type: Sequelize.INTEGER,
        references: {
          model: "serviceInputFields",
          key: "id", 
        },
      },
      value: {
        type: Sequelize.STRING,
      }
    });
    return eventRequestServicesServices;
  };
  