module.exports = (sequelize, Sequelize) => {
    const categories = sequelize.define("categories", {
       categoryName: {
          type: Sequelize.STRING
        },
        description: {
          type: Sequelize.STRING,
        },
       
      });

    return categories; 
  };