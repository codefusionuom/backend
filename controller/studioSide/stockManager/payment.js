const asyncHandler = require("express-async-handler")
const db = require("../../../config/db.config");
const payment = db.paymentStk; 


exports.createPayment = asyncHandler(async (req, res ) =>  {
    try {
        // Extract data from the request body
        const {
            supplierName,
            itemName,
            date,
            telephone,
            quantity,
            price,
            description,
        } = req.body;

        // Create a new payment
        const newPayment = await payment.create({
            supplierName,
            itemName,
            date,
            telephone,
            quantity,
            price,
            description,
        });

        // Respond with a success message
        res.status(201).json({
            success: true,
            message: 'Payment created successfully',
            payment: newPayment,
        });
    } catch (error) {
        // If an error occurs, respond with an error message
        console.error('Error creating payment:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to create payment',
            error: error.message
        });
       
    }

})

exports.getPaymentDetails = asyncHandler(async (req, res) => {
    try {
        // Extract the  ID from the request parameters
        const { id } = req.params;

        // Find the stock item by itemId
        const foundPayment = await payment.findOne({ where: { id } });

        // If the stock item is found, return 
        if (foundPayment) {
            res.status(200).json({
                success: true,
                message: 'Payment found',
                payment: foundPayment,
            });
        } else {
            res.status(404).json({
                success: false,
                message: 'Payment not found',
            });
        }
    } catch (error) {
        console.error('Error fetching payment:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to fetch payment',
            error: error.message
        });
    }

})
exports.getPayment = asyncHandler(async (req, res) => {
    try{
        // Retrieve the list of payment from the database
        const payments = await payment.findAll();

        if(payments){
            res.status(200).json({
                success: true,
                message: 'Payment found',
                payments,
            })  
                  
        }else{
            res.status(400).json({
                success: false,
                message: 'No payments found'
            })
        }
    }catch (error){
        console.log("Error fetching payments")
        res.status(500).json({
            success: false,
            message: 'Failed to fetch payments'
        })
    }
    

})



exports.deletePayment = asyncHandler(async (req, res) => {
    try{

        const{ id } = req.params;

        //find id
        const existingPayment = await payment.findOne({ where: { id }})

        if(existingPayment){
            await payment.destroy({ where: { id }})

            res.status(200).json({
                success:true,
                message: ' Payment deleted successfully'
            })
        } else{

            res.status(400).json({
                success: false,
                message: 'Payment not found'
                
            })
        }
    }catch(error){
        console.log('Error deleting payment:', error)
        res.status(500).json({
            success: false,
            message:'Failed to delete payment'
        })
    }


})



