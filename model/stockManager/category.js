const stockManagerModel = require("./stockManager.model");

module.exports = (sequelize, Sequelize) => {
    const category = sequelize.define("category", {
        categoryId: {
          type: Sequelize.STRING,
          unique: 'uniqueTag',
        },
       categoryName: {
          type: Sequelize.STRING
        },
        description: {
          type: Sequelize.STRING,
        },
       
      });

    return category;
  };