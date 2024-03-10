
module.exports = (sequelize, Sequelize) => {
    const returnedStock = sequelize.define("returnedStock", {
        itemId: {
          type: Sequelize.STRING,
          unique: 'uniqueTag5',
        },
        itemName: {
            type: Sequelize.STRING
          },
        price: {
            type: Sequelize.FLOAT,
            
          },
       categoryId: {
          type: Sequelize.STRING,
        },
        supplierId: {
            type: Sequelize.STRING,
          },
        date: {
            type: Sequelize.DATE,
          },
            });

    return returnedStock;
  };