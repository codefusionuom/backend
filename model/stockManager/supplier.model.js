

module.exports = (sequelize, Sequelize) => {
    const supplier = sequelize.define("supplier", {
        supplierId: {
          type: Sequelize.STRING,
          unique: 'uniqueTag',
        },
        supplierName: {
            type: Sequelize.STRING
          },
        itemId: {
            type: Sequelize.STRING,
            
          },
       contactNo: {
        type: Sequelize.STRING,
        },
        status: {
            type: Sequelize.BOOLEAN,
          },
            });

    return supplier;
  };