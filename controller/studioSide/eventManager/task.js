const asyncHandler = require("express-async-handler");
// const Task = require("../../../model/eventManager/task.model");
const db = require("../../../config/db.config");
const { rows } = require("mssql");
const Task = db.tasks;
const AssignedTask = db.assignedTasks;
const createTask = asyncHandler(async (req, res) => {
    try {
        const {
          eventId,
          taskName,
          serviceType,
          department,
          status,
          description,
        } = req.body;
        let { date} = req.body;

    var selectedDateWithOnedayOff = new Date(date);
    const correctedDate =  new Date( selectedDateWithOnedayOff.getTime() + Math.abs(selectedDateWithOnedayOff.getTimezoneOffset()*60000) );
        
    console.log("eeeeeeeeeeeeeventId: " + eventId);
        const task = await Task.create({
            eventId : eventId,
            taskName : taskName,
            serviceType : serviceType,
            department : department,
            status : status,
            description : description,
            date : correctedDate
        })
        console.log("eeeeeeeeeeeeeventId: " + eventId);
    if(!task) return res.status(400).json({ message: "Task creation was not successful!" });
        res.status(200).json({ message: "Task created successfully!" });
    } catch (error) {
        res.status(500).json({ message: "Could not create the Task!" , error: error.message  });        
    }
});



const getEventCategories = asyncHandler(async (req, res) => {   //get service types of events
   try {
     const serviceTypeValues = await db.sequelize.models.events.rawAttributes.serviceType.values;
     if(!serviceTypeValues) return res.status(400).json({ message: "Event category fetch was not successful!" });
     res.status(200).json({
         serviceTypes: serviceTypeValues,
       });
   } catch (error) {
    res.status(500).json({ message: "Event category fetch was not successful!!" , error: error.message  });   
   }
})

const getTasksByEmployeeId = asyncHandler(async (req, res) => { 
    try {
        console.log("cameeeeeee--------------------------------------------")
        const { empId } = req.query;
        console.log("EmpId :" + empId);
        // const data = await Event.findOne({ where: { eventId: eventId } ,include :[Customer]  })
        
        const { count, rows } = await AssignedTask.findAndCountAll({
            where: {
              empId:empId,
            },
            include: [Task],
            // offset: 10,
            // limit: 10,
          });
        const assignedTasks = rows;
console.log("assignedTasks" + assignedTasks)
        if (!assignedTasks || assignedTasks.length == 0) return res.json({})

        else return res.status(200).json({ assignedTasks: assignedTasks})
        
    } catch(error) {
        
    }
})

const getAllTasks = asyncHandler(async (req, res) => { 
    const tasks = await Task.findAll();
      if(!tasks) return res.status(400).json({error : error.message})
    
       res.status(200).json({tasks: tasks})
      console.log(count);
      console.log(rows);
});
// app.get('/api/event-enums', (req, res) => {
//     const serviceTypeValues = db.sequelize.models.events.rawAttributes.serviceType.values;
    
//     res.json({
//       serviceTypes: serviceTypeValues,
//     });
//   });
  


module.exports = {createTask , getEventCategories , getTasksByEmployeeId ,getAllTasks}