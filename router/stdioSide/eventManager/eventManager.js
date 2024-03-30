const express =require('express');
const { createEvent, updateEvent, allEvents, test, filterEventsBetween, getOnedayEvents, getTodayEvents, getSelectedDayEvents } = require('../../../controller/studioSide/eventManager/eventManager');
const router = express.Router();
const db = require("../../../config/db.config");
//event Manager
router.get("/eventManager",);
router.post("/createEvent", createEvent);
router.get("/all-events", allEvents);
router.get("/eventManager/eventDetails/:id",);
router.post("/updateEvent/:eventId", updateEvent);
router.get("/eventManager/searchEvent",);
router.get("/eventManager/eventRequests",);
router.get("/eventManager/eventCalandar",);
router.get("/eventManager/assignEmployee/:id",);
router.get("/eventManager/events",);
router.get("/eventManager/FilterEvents/:status",);
router.get("/Filter/Between",filterEventsBetween);
router.get("/getOnedayEvents", getOnedayEvents);
router.get("/todayEvent", getTodayEvents);
router.post("/selectedDayEvents", getSelectedDayEvents);

module.exports = router;//