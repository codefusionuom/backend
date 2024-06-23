const express =require('express');
const { createEvent, updateEvent, allEvents, test, filterEventsBetween, getOnedayEvents, getTodayEvents, getSelectedDayEvents, getCustomer, getEvent, getAllEmployees } = require('../../../controller/studioSide/eventManager/eventManager');
const router = express.Router();
const db = require("../../../config/db.config");
const { createTask, getEventCategories, getTasksByEmployeeId, getAllTasks, getTaskById, getEmployeesByTaskId } = require('../../../controller/studioSide/eventManager/task');
const { createAssignedTask } = require('../../../controller/studioSide/eventManager/assignedTasks');
//event Manager
router.get("/Filter/Between",filterEventsBetween);
router.get("/getOnedayEvents", getOnedayEvents);
router.get("/todayEvent", getTodayEvents);
router.post("/selectedDayEvents", getSelectedDayEvents);
router.post("/createEvent", createEvent);
router.get("/all-events", allEvents);
router.post("/getCustomer",getCustomer);
router.get("/eventDetails/:eventId",getEvent);
router.post("/updateEvent/:eventId", updateEvent);
router.get("/eventManager/searchEvent",);
router.get("/eventManager/FilterEvents/:status",);
router.get("/eventManager/eventRequests",);
router.get("/eventManager/eventCalandar",);
router.get("/eventManager/assignEmployee/:id",);
router.get("/eventManager/events",);

//-----------Tasks routes---------------
router.post("/tasks/create", createTask);
router.post("/tasks/assigned-Task/create", createAssignedTask);

router.get("/all-employees", getAllEmployees);
router.get("/event-categories", getEventCategories);
router.get("/tasks/all-tasks", getAllTasks);
router.get('/tasks/task-dettail/:taskId', getTaskById);
router.get("/task/assigned-employees/:taskId", getEmployeesByTaskId);

//-----------Assigned Task routes---------------
router.get("/employee-asignedTasks", getTasksByEmployeeId);


module.exports = router;