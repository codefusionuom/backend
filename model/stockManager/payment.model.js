module.exports = (sequelize, Sequelize) => {
    const paymentStk = sequelize.define("paymentStk", {
        supplierId: {
          type: Sequelize.STRING,
          unique: 'uniqueTag6',
        },
        supplierName: {
            type: Sequelize.STRING
          },
        date: {
            type: Sequelize.DATE,
            
          },
       telephone: {
          type: Sequelize.INTEGER,
        },
        quantity: {
            type: Sequelize.INTEGER,
          },
        stockItem: {
            type: Sequelize.STRING,
          },
        price: {
            type: Sequelize.FLOAT,
          },
       
      });

    return paymentStk;
  };