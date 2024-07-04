const express =require('express');
const { create } = require('../stdioSide/customerManager/tutorial');
const { getEventCode, postEventCode } = require('../../controller/customerSide');
const router = express.Router();


//customerRequests
router.get("/events/:eventcode",getEventCode );
router.post("/customerTrack",postEventCode );


module.exports =router ;