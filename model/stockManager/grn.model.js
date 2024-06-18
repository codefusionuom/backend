module.exports = (sequelize, Sequelize) => {
    const grn = sequelize.define("grn", {

        itemName: {
            type: Sequelize.STRING
          },
        category: {
            type: Sequelize.STRING,
        },
        supplierName: {
          type: Sequelize.STRING,
      },
       amount: {
          type: Sequelize.FLOAT, 
        },
        subtotal: {
          type: Sequelize.FLOAT, 
        },
        discount: {   
          type: Sequelize.FLOAT,
        },
        date: {
            type: Sequelize.DATE,
          },  
        quantity: {
            type: Sequelize.INTEGER,
          },
       
        description: {
          type: Sequelize.STRING ,
        },
        
      }); 

    return grn;
  };        