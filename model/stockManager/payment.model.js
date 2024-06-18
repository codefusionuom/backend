module.exports = (sequelize, Sequelize) => {
    const paymentStk = sequelize.define("paymentStk", {
        supplierName: {
            type: Sequelize.STRING
          },
          itemName: {
            type: Sequelize.STRING
          },
        date: {
            type: Sequelize.DATE,
            
          },
       telephone: {
          type: Sequelize.STRING,  
        },
        quantity: {
            type: Sequelize.INTEGER, 
          },
        price: {
            type: Sequelize.FLOAT,
          },
        description: { 
            type: Sequelize.STRING, 
          }, 
       
      });

    return paymentStk;
  };