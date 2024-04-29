const customerModel = require("./customer.model");

module.exports = (sequelize, Sequelize) => {
    const customerPayments = sequelize.define("customerPayments", {
        customerId: {
          type: Sequelize.INTEGER,
          references: {
              model: "customers", 
              key: 'id'
            } 
        },
        // eventId:{
        //   type:Sequelize.STRING
        // },
        // eventId: {
        //   type: Sequelize.INTEGER,
        //   // references: {
        //   //     model: "customers", 
        //   //     key: 'id'
        //   //   } 
        // },
        description: {
          type: Sequelize.STRING
        },
        amount: {
          type: Sequelize.FLOAT,
        },
        offers: {
          type: Sequelize.FLOAT,
        },
        payment: {
          type: Sequelize.FLOAT,
        },
        status: {
          type: Sequelize.STRING
        },
        type: {
          type: Sequelize.STRING
        }
      });

    return customerPayments;
  };