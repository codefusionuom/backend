const express =require('express')
const router = express.Router();
const{getCustomers, createCustomers, deleteCustomer,getSearchCustomerEvents,updateCustomer,getSearchCustomer}=require('../../../controller/studioSide/customerManager/customer');
const {  } = require('./tutorial');
const { createPayment,getCustomerPayment,getCustomerPaymentDetails ,getSearchPayment} = require('../../../controller/studioSide/customerManager/payment');
const { getAllCustomerRequests } = require('../../../controller/studioSide/customerManager/customerRequest');


// customer
router.get("/customer/:page",getAllCustomerRequests );//dummy one
//router.get("/customer/:page",getCustomers );// actual one
router.put("/customer/:id",updateCustomer );
router.post("/customer", createCustomers);
router.delete("/customer/:id", deleteCustomer);
router.get("/customer",getSearchCustomer );
router.get("/customerEvents/:mobilePhone",getSearchCustomerEvents);



//payments
router.get("/payments/:page", getCustomerPayment); // getcustomers
router.post("/payment",createPayment);
router.get("/payment/",getSearchPayment );// wait for date format ,time range
router.get("/payment/:id", getCustomerPaymentDetails);

//customerRequests
// router.get("/customerRequest", );// socket.io
// router.put("/customerRequest", );
router.post("/customerRequest", getAllCustomerRequests);
router.delete("/customerRequest", );
// router.get("/customerRequest/?search", );
// router.post("/customerRequest/confirm", );



// router.post("/tutorialCreate", create)

module.exports =router ;