module.exports = (sequelize, Sequelize) => {
    const category = sequelize.define("category", {
        categoryId: { 
          type: Sequelize.STRING,
          unique: 'uniqTag',
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