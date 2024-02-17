const stockManagerModel = require("./stockManager.model");

module.exports = (sequelize, Sequelize) => {
    const stockItem = sequelize.define("stockItem", {
        itemId: {
          type: Sequelize.STRING,
          unique: 'uniqueTag',
        },
        itemName: {
            type: Sequelize.STRING
          },
        categoryId: {
            type: Sequelize.STRING,
            
          },
       cost: {
          type: Sequelize.FLOAT,
        },
        realCost: {
            type: Sequelize.FLOAT,
          },
        minQty: {
            type: Sequelize.INT,
          },
        quantity: {
            type: Sequelize.INT,
          },
        status: {
            type: Sequelize.BOOLEAN,
          },
          
        description: {
          type: Sequelize.STRING,
        },
       
      });

    return stockItem;
  };