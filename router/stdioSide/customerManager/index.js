const express =require('express')
const router = express.Router();
const{getCustomers, createCustomers, deleteCustomer,getSearchCustomerEvents,updateCustomer,getSearchCustomer}=require('../../../controller/studioSide/customerManager/customer');
const {  } = require('./tutorial');
const { createPayment,getCustomerPayment,getCustomerPaymentDetails ,getSearchAllPayment} = require('../../../controller/studioSide/customerManager/payment');
const { getAllCustomerRequests } = require('../../../controller/studioSide/customerManager/customerRequest');
const { getCustomerServices, createCustomerServices,getCustomerService,updateCustomerService,deleteCustomerService } = require('../../../controller/studioSide/customerManager/customerService');


// customer
router.put("/customer/:id",updateCustomer );
router.post("/customer", createCustomers);
router.delete("/customer/:id", deleteCustomer);
// router.get("/customer",getSearchCustomer );
// router.get("/customerEvents/:mobilePhone",getSearchCustomerEvents);



//payments
// router.get("/payments/:page", getCustomerPayment); // getcustomers
router.post("/payment",createPayment);
// router.get("/payment/",getSearchAllPayment );// wait for date format ,time range
// router.get("/payment/:id", getCustomerPaymentDetails);

//customerRequests
router.get("/customerRequest", );// socket.io
// router.put("/customerRequest", );
router.post("/customerRequest", getAllCustomerRequests);
router.get("/customerRequest/?search", );
// router.post("/customerRequest/confirm", );

//customerServices
// router.get("/customerService",getCustomerServices );
// router.get("/customerService/:id",getCustomerService );
router.post("/customerService", createCustomerServices);
router.put("/customerService/:id",updateCustomerService );
router.delete("/customerService/:id", deleteCustomerService);
router.get("/customerEvents/:mobilePhone",getSearchCustomerEvents);



module.exports =router ;