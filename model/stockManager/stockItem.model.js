module.exports = (sequelize, Sequelize) => {
  const StockItem = sequelize.define("stockItems", {
    categoryId: {
      type: Sequelize.INTEGER,
      references: {
        model: "categories", 
        key: 'id'
      }
    },
    itemName: {
      type: Sequelize.STRING
    },
    itemCategory: { // Renamed from 'category' to 'itemCategory'
      type: Sequelize.STRING
    },
    cost: {
      type: Sequelize.FLOAT
    },
    description: { 
      type: Sequelize.STRING
    }
  });

  return StockItem; 
};
