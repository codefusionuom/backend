const express =require('express')
const router = express.Router();
const{getCustomers, createCustomers, deleteCustomer,updateCustomer}=require('../../../controller/studioSide/customerManager/customer');
const {  } = require('./tutorial');
const { createPayment,getCustomerPayment,getCustomerPaymentDetails ,getSearchPayment} = require('../../../controller/studioSide/customerManager/payment');


// customer
router.get("/customer/:page",getCustomers );
router.put("/customer/:id",updateCustomer );
router.post("/customer", createCustomers);
router.delete("/customer/:id", deleteCustomer);
router.get("/customer/?search", );


//payments
router.get("/payments/:page", getCustomerPayment);
router.post("/payment",createPayment);
router.get("/payment",getSearchPayment );// wait for date format ,time range
router.get("/payment/:id", getCustomerPaymentDetails);

//customerRequests
router.get("/customerRequest", ); // socket.io
router.put("/customerRequest", );
router.post("/customerRequest", );
router.delete("/customerRequest", );
router.get("/customerRequest/?search", );
router.post("/customerRequest/confirm", );

// router.post("/tutorialCreate", create)

module.exports =router ;