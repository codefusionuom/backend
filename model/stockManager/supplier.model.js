

module.exports = (sequelize, Sequelize) => {
    const suppliers = sequelize.define("supplier", {
        supplierName: {
            type: Sequelize.STRING
          },
       contactNo: {
        type: Sequelize.STRING,
        },
        email: {
            type: Sequelize.STRING,
          },
        address:{
          type:Sequelize.STRING
        },
            });

    return suppliers;  
  };  