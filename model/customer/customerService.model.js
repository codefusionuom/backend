const { DataTypes } = require('sequelize');

module.exports = (sequelize, Sequelize) => {
    const customerServices = sequelize.define("customerServices", {
      serviceName: {
        type: Sequelize.STRING,
        unique: true
      },
      description: {
        type: Sequelize.STRING
      },
      inputFields: {
        type: Sequelize.STRING,
      },
      selectFields: {
        type: Sequelize.STRING,
      },
      parentService: {
        type: Sequelize.INTEGER,
        references: {
            model: "customerServices",
            key: 'id', 
          } 
      },
      price: {
        type: Sequelize.REAL,
      }
      
    });
      return customerServices
    };