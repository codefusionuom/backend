module.exports = (sequelize, Sequelize) => {
  const customers = sequelize.define("customers", {
    firstname: {
      type: Sequelize.STRING
    },
    lastname: {
      type: Sequelize.STRING
    },
    email: {
      type: Sequelize.STRING,
      unique: true
    },
    mobilePhone: {
      type: Sequelize.STRING,
      unique: true,
      allowNull: false,
    },
    address: {
      type: Sequelize.STRING
    },
    status: {
      type: Sequelize.BOOLEAN
    }
  });
    return customers
  };