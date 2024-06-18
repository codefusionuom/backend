const asyncHandler = require("express-async-handler");
const db = require("../../../config/db.config");
const returnedStock = db.returnedStock;

exports.createReturnItem = asyncHandler(async (req, res) => {
  try {
    const { items, description, date } = req.body;

    if (!items || !Array.isArray(items) || items.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'Items array is required and cannot be empty',
      });
    }

    // Use a transaction to ensure all items are created successfully
    const transaction = await db.sequelize.transaction();

    try {
      const createdItems = [];

      for (const item of items) {
        const { itemName, price, category, quantity } = item;

        const newReturnItem = await returnedStock.create(
          {
            itemName,
            price,
            category,
            quantity,
            date,
            description,
          },
          { transaction }
        );

        createdItems.push(newReturnItem);
      }

      await transaction.commit();

      res.status(201).json({
        success: true,
        message: 'Return items created successfully',
        items: createdItems,
      });
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  } catch (error) {
    console.error('Error creating return items:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to create return items',
    });
  }
});


exports.getReturnStockItem = asyncHandler(async (req, res) => {
  try{
   const { id } = req.params;
  const foundReturnItem = await returnedStock.findOne({ where: {id}})

  if (foundReturnItem) {
    res.status(200).json({
        success: true,
        message: 'Return Item found',
        category: foundReturnItem,
    });
} else {
    res.status(404).json({
        success: false,
        message: 'Return Item not found',
    });
}
  }
catch (error) {
  console.error('Error fetching Return Item:', error);
  res.status(500).json({
      success: false,
      message: 'Failed to fetch Return Item',
  });
}

})
exports.getReturnItemList = asyncHandler(async (req, res) => {
  try{
    const returnItems = await returnedStock.findAll();

    if (returnItems) {
      res.status(200).json({
          success: true,
          message: 'return Items found',
          returnItems,
      });
  } else {
      res.status(404).json({
          success: false,
          message: 'No return Items found',
      });
  }
} catch (error) {
  console.error('Error fetching return Items:', error);
  res.status(500).json({
      success: false, 
      message: 'Failed to fetch return Items',
  });
}
})
 


exports.updateReturnItem = asyncHandler(async (req, res) => {
  try {
      
      const { id } = req.params;

      
      const
      {
      itemName,
      price,
      category,
      quantity,
      date,
      description, 
      } = req.body;

         
      let existingReturnItem = await returnedStock.findOne({ where: { id } });

       
      if (existingReturnItem) {
          await returnedStock.update({
            itemName,
            price,
            category,
            quantity,
            date,
            description,
          }, { 
              where: { id }
          }); 

          // Fetch the updated Return Item from the database
          existingReturnItem = await returnedStock.findOne({ where: { id } });
 
          res.status(200).json({
              success: true, 
              message: 'Return Item updated successfully',
              returnItems: existingReturnItem,
          });
      } else {
          // If the Return Item is not found, return a 404 status code
          res.status(404).json({
              success: false,
              message: 'Return Item not found',
          });
      }
  } catch (error) {
      console.error('Error updating Return Item:', error);
      res.status(500).json({
          success: false,
          message: 'Failed to update Return Item',
      });
  }
});



exports.deleteReturnItem  = asyncHandler(async (req, res) => {
  try {
      // Extract Return Item Id from the request parameters
      const { id } = req.params;

      // Find the ReturnItem  by id
      const existingReturnItem  = await returnedStock.findOne({ where: { id } });

      // If the ReturnItem  exists, delete it
      if (existingReturnItem ) {
          await returnedStock.destroy({ where: { id } });

          res.status(200).json({
              success: true,
              message: 'ReturnItem  deleted successfully',
          });
      } else {
          // If the ReturnItem  is not found, return a 404 status code
          res.status(404).json({
              success: false,
              message: 'ReturnItem  not found',
          });
      }
  } catch (error) {
      console.error('Error deleting ReturnItem :', error);
      res.status(500).json({
          success: false,
          message: 'Failed to delete ReturnItem ',
      });
  }
}); 

  
exports.searchReturnStockItem = asyncHandler(async (req, res) => {
  try {
      // Extract the search query from the request parameters
      const { searchQuery } = req.query;

      // Perform the search operation in the database
      const returnItem = await returnedStock.findAll({
          where: {
              // Define the search criteria based on your database schema
              [Sequelize.Op.or]: [
                  { ReturnStockItemId: { [Sequelize.Op.like]: `%${searchQuery}%` } },
                  { ReturnStockItemName: { [Sequelize.Op.like]: `%${searchQuery}%` } },
                  // Add more search criteria if necessary
              ],
          },
      });

      // Respond with the list of categories matching the search criteria
      res.status(200).json({
          success: true,
          message: 'returnItem found', 
          returnItem, 
      });
  } catch (error) {
      console.error('Error searching returnItem:', error);
      res.status(500).json({
          success: false,
          message: 'Failed to search returnItem',
      });
  } 
});



 

