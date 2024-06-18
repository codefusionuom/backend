const asyncHandler = require("express-async-handler")
const db = require("../../../config/db.config");
const stockItem = db.stockItems;



exports.createStockItem = asyncHandler(async (req, res) => {
    try {
        // Extract data from the request body
        const {
            itemName,
            itemCategory, 
            cost,
            description
        } = req.body;

        // Create a new stock item in the database
        const newStockItem = await stockItem.create({
            itemName,
            itemCategory, 
            cost,
            description
        });

        // Respond with a success message and the newly created stock item data
        res.status(201).json({
            success: true,
            message: 'Stock item created successfully',
            stockItem: newStockItem,
        });
    } catch (error) {
        // If an error occurs, respond with an error message
        console.error('Error creating stock item:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to create stock item',
            error: error.message
        });
       
    }
});


exports.getStockItem = asyncHandler(async (req, res) => {
    try {
        // Extract the item ID from the request parameters
        const { id } = req.params;

        // Find the stock item by itemId
        const foundStockItem = await stockItem.findOne({ where: { id } });

        // If the stock item is found, return 
        if (foundStockItem) {
            res.status(200).json({
                success: true,
                message: 'Stock item found',
                stockItem: foundStockItem,
            });
        } else {
            res.status(404).json({
                success: false,
                message: 'Stock item not found',
            });
        }
    } catch (error) {
        console.error('Error fetching stock item:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to fetch stock item',
            error: error.message
        });
    }
});

    
exports.getStockItemList = asyncHandler(async (req, res) => {
    try{
        // Retrieve the list of stock Items from the database
        const stockItems = await stockItem.findAll();

        if(stockItems){
            res.status(200).json({
                success: true,
                message: 'Stock Items found',
                stockItems,
            })  
                  
        }else{
            res.status(400).json({
                success: false,
                message: 'No stock items found'
            })
        }
    }catch (error){
        console.log("Error fetching stock items")
        res.status(500).json({
            success: false,
            message: 'Failed to fetch stock items'
        })
    }
    


})


exports.updateStockItem = asyncHandler(async (req, res) => {
    try{
        const { id } = req.params;

          // Extract data from the request body
          const {
            itemName,
            itemCategory, 
            cost,
            description
        } = req.body;


        //find stock item by id
        let existingStockItem = await stockItem.findOne({ where:{ id } })

        if (existingStockItem){
            await stockItem.update({
                itemName,
                itemCategory, 
                cost,
                description

            },{
                where: { id }
            }        
            
            )
            //get the updated stock item from the database
            existingStockItem = await stockItem.findOne({ where: { id } })

            res.status(200).json({
                success: true,
                message: 'Stock Item updated successfully',
                stockItem: existingStockItem,
            })
        } else {
            res.status(404).json({
                success: false,
                message: 'Stock item not found'
            })

        }
     } catch (error) {
        console.log('Error updating itemCategory',error);
        res.status(500).json({
            success: false,
            message:'Failed to update stock Item'
        })
     }
    })




exports.deleteStockItem = asyncHandler(async (req, res) => {
    try{

        const{ id } = req.params;

        //find the stock item by id
        const existingStockItem = await stockItem.findOne({ where: { id }})

        if(existingStockItem){
            await stockItem.destroy({ where: { id }})

            res.status(200).json({
                success:true,
                message: ' Stock Item deleted successfully'
            })
        } else{

            res.status(400).json({
                success: false,
                message: 'Stock Item not found'
                
            })
        }
    }catch(error){
        console.log('Error deleting stock item:', error)
        res.status(500).json({
            success: false,
            message:'Failed to delete stock item'
        })
    }


})




      