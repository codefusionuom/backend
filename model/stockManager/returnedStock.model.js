
module.exports = (sequelize, Sequelize) => {
    const returnedStock = sequelize.define("returnedStock", {
        itemName: {
            type: Sequelize.STRING
          },
        price: {
            type: Sequelize.FLOAT,
            
          },
       category: {
          type: Sequelize.STRING,
        },
        quantity: {
            type: Sequelize.INTEGER,
          },
        date: {
            type: Sequelize.DATE,
          },
        description: { 
            type: Sequelize.STRING,
          },
            });    

    return returnedStock;  
  };   