const asyncHandler = require("express-async-handler")
const db = require("../../../config/db.config");
const category = db.category;


exports.createCategory = asyncHandler(async (req, res) => {
   
    try {
        // Extract category data from request body
        const { categoryId, categoryName, description } = req.body;
    
        // Create a new category entry in the database
        const newCategory = await category.create({
          categoryId,
          categoryName,
          description,
        });
    
        // Respond with a success message and the newly created category data
        res.status(201).json({
          success: true,
          message: 'Category created successfully',
          category: newCategory,
        });
      } catch (error) {
        // If an error occurs, respond with an error message
        console.error('Error creating category:', error);
        res.status(500).json({
          success: false,
          message: 'Failed to create category',
        });
      }
});

exports.getCategory = asyncHandler(async (req, res) => {
  try {
      // Extract categoryId from the request parameters
      const { categoryId } = req.params;
      
      // Find the category by categoryId
      const foundCategory = await category.findOne({ where: { categoryId } });

      // If category is found, return it
      if (foundCategory) {
          res.status(200).json({
              success: true,
              message: 'Category found',
              category: foundCategory,
          });
      } else {
          res.status(404).json({
              success: false,
              message: 'Category not found',
          });
      }
  } catch (error) {
      console.error('Error fetching category:', error);
      res.status(500).json({
          success: false,
          message: 'Failed to fetch category',
      });
  }
});

exports.getCategoryList = asyncHandler(async (req, res) => {
  try {
      // Retrieve the list of categories from the database
      const categories = await category.findAll();

      // If categories are found, return them
      if (categories) {
          res.status(200).json({
              success: true,
              message: 'Categories found',
              categories,
          });
      } else {
          res.status(404).json({
              success: false,
              message: 'No categories found',
          });
      }
  } catch (error) {
      console.error('Error fetching categories:', error);
      res.status(500).json({
          success: false,
          message: 'Failed to fetch categories',
      });
  }
});



exports.updateCategory = asyncHandler(async (req, res) => {
  try {
      // Extract categoryId from the request parameters
      const { id } = req.params;

      // Extract updated category data from the request body
      const { categoryId, categoryName, description } = req.body;

      // Find the category by id
      let existingCategory = await category.findOne({ where: { id } });

      // If the category is found, update its attributes
      if (existingCategory) {
          await category.update({
              categoryId,
              categoryName,
              description,
          }, {
              where: { id }
          });

          // Fetch the updated category from the database
          existingCategory = await category.findOne({ where: { id } });

          res.status(200).json({
              success: true,
              message: 'Category updated successfully',
              category: existingCategory,
          });
      } else {
          // If the category is not found, return a 404 status code
          res.status(404).json({
              success: false,
              message: 'Category not found',
          });
      }
  } catch (error) {
      console.error('Error updating category:', error);
      res.status(500).json({
          success: false,
          message: 'Failed to update category',
      });
  }
});



exports.deleteCategory = asyncHandler(async (req, res) => {
  try {
      // Extract categoryId from the request parameters
      const { id } = req.params;

      // Find the category by id
      const existingCategory = await category.findOne({ where: { id } });

      // If the category exists, delete it
      if (existingCategory) {
          await category.destroy({ where: { id } });

          res.status(200).json({
              success: true,
              message: 'Category deleted successfully',
          });
      } else {
          // If the category is not found, return a 404 status code
          res.status(404).json({
              success: false,
              message: 'Category not found',
          });
      }
  } catch (error) {
      console.error('Error deleting category:', error);
      res.status(500).json({
          success: false,
          message: 'Failed to delete category',
      });
  }
});


exports.searchCategory = asyncHandler(async (req, res) => {
  try {
      // Extract the search query from the request parameters
      const { searchQuery } = req.query;

      // Perform the search operation in the database
      const categories = await category.findAll({
          where: {
              // Define the search criteria based on your database schema
              [Sequelize.Op.or]: [
                  { categoryId: { [Sequelize.Op.like]: `%${searchQuery}%` } },
                  { categoryName: { [Sequelize.Op.like]: `%${searchQuery}%` } },
                  // Add more search criteria if necessary
              ],
          },
      });

      // Respond with the list of categories matching the search criteria
      res.status(200).json({
          success: true,
          message: 'Categories found',
          categories,
      });
  } catch (error) {
      console.error('Error searching categories:', error);
      res.status(500).json({
          success: false,
          message: 'Failed to search categories',
      });
  }
});



