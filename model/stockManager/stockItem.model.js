

module.exports = (sequelize, Sequelize) => {
    const stockItem = sequelize.define("stockItem", {
        itemId: {
          type: Sequelize.STRING,
          unique: 'uniqueTag4',
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
            type: Sequelize.INTEGER,
          },
        quantity: {
            type: Sequelize.INTEGER,
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