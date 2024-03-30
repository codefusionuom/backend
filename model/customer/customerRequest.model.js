module.exports = (sequelize, Sequelize) => {
    const customerRequests = sequelize.define("customers", {
      firstname: {
        type: Sequelize.STRING
      },
      lastname: {
        type: Sequelize.STRING
      },
      email: {
        type: Sequelize.STRING,
        unique: 'uniqueTag',
      },
      mobilePhone: {
        type: Sequelize.STRING,
        unique: 'uniqueTag',
      },
      address: {
        type: Sequelize.STRING
      },
      serviceType: {
        type: Sequelize.STRING,
      },
      serviceDate: {
        type: Sequelize.DATE,
      },
      note: {
        type: Sequelize.STRING,
      },

    });
      return customerRequests
    };