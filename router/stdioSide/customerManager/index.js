const express =require('express')
const router = express.Router();
const{getCustomers, createCustomers, deleteCustomer,getSearchCustomerEvents,updateCustomer,getSearchCustomer}=require('../../../controller/studioSide/customerManager/customer');
const {  } = require('./tutorial');
const { createPayment,getCustomerPayment,getCustomerPaymentDetails ,getSearchAllPayment} = require('../../../controller/studioSide/customerManager/payment');
const { getAllCustomerRequests, updateCustomerRequest } = require('../../../controller/studioSide/customerManager/customerRequest');
const { getServices, getService, createService, updateService, deleteService } = require('../../../controller/studioSide/customerManager/service');
const { createEventRequest, getAllEventRequests, getEventRequest } = require('../../../controller/studioSide/customerManager/eventRequest');


// customer
router.put("/customer/:id",updateCustomer );
router.post("/customer", createCustomers);
router.delete("/customer/:id", deleteCustomer);
router.get("/customer", getCustomers);
router.get("/customerEvents/:mobilePhone",getSearchCustomerEvents);



//payments
router.get("/payment", getCustomerPayment); // getcustomers
router.post("/payment",createPayment);
// router.get("/payment/",getSearchAllPayment );// wait for date format ,time range
router.get("/payment/:id", getCustomerPaymentDetails);

//customerRequests
router.get("/customerRequest", );// socket.io
router.put("/customerRequest/:id",updateCustomerRequest );
router.post("/customerRequest", getAllCustomerRequests);
router.get("/customerRequest/?search", );
// router.post("/customerRequest/confirm", );
router.post("/eventRequestService", createEventRequest);
router.get("/eventRequest", getAllEventRequests);
router.get("/eventRequest/:id", getEventRequest);
//customerServices
router.get("/Service",getServices );
router.get("/Service/:id",getService );
router.post("/Service", createService);
router.put("/Service/:id",updateService );
router.delete("/Service/:id", deleteService)
//router.get("/customerEvents/:mobilePhone",getSearchCustomerEvents);



module.exports =router ;