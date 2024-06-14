const asyncHandler = require("express-async-handler");
// const Task = require("../../../model/eventManager/task.model");
const db = require("../../../config/db.config");
const { rows } = require("mssql");
const Task = db.tasks;
const AssignedTask = db.assignedTasks;
const Employee = db.employee;

// const createTask = asyncHandler(async (req, res) => {
//     try {
//         const {
//           eventId,
//           taskName,
//           serviceType,
//           department,
//           status,
//           description,
//         } = req.body;
//         let { date} = req.body;
        


//     var selectedDateWithOnedayOff = new Date(date);
//     const correctedDate =  new Date( selectedDateWithOnedayOff.getTime() + Math.abs(selectedDateWithOnedayOff.getTimezoneOffset()*60000) );
        
//     console.log("eeeeeeeeeeeeeventId: " + eventId);
//         const task = await Task.create({
//             eventId : eventId,
//             taskName : taskName,
//             serviceType : serviceType,
//             department : department,
//             status : status,
//             description : description,
//             date : correctedDate
//         })
//         console.log("eeeeeeeeeeeeeventId: " + eventId);
//     if(!task) return res.status(400).json({ message: "Task creation was not successful!" });
//         res.status(200).json({ message: "Task created successfully!" });
//     } catch (error) {
//         res.status(500).json({ message: "Could not create the Task!" , error: error.message  });        
//     }
// });
const createTask = asyncHandler(async (req, res) => {
    try {
        const {
          eventId,
          taskName,
          serviceType,
          department,
          status,
          description,
          employeeIdList,  // Assuming you have a list of employees to assign
        //   taskId, 
        } = req.body;
        let { date } = req.body;

        // Correct the date for timezone offset
        const selectedDateWithOnedayOff = new Date(date);
        const correctedDate = new Date(selectedDateWithOnedayOff.getTime() + Math.abs(selectedDateWithOnedayOff.getTimezoneOffset() * 60000));
        
        // Start a transaction
        await db.sequelize.transaction(async (transaction) => {
            // Create the task
            const task = await Task.create({
                eventId,
                taskName,
                serviceType,
                department ,
                status ,
                description,
                date: correctedDate
            }, { transaction });

            if (!task) {
                throw new Error("Task creation was not successful!");
            }

            // Perform additional operations (e.g., assign employees)
            if (employeeIdList && employeeIdList.length > 0) {
                for (const emplyeeId of employeeIdList) {
                    const assignedTask = await AssignedTask.create({
                        eventId,
                        emplyId : emplyeeId,
                        taskId: task.id  // Use the ID of the created task
                    }, { transaction });

                    if (!assignedTask) {
                        throw new Error("Assigning task to employee was not successful!");
                    }
                }
            }

            // Optionally, perform more operations within this transaction block
            // ...

            // If all operations succeed, the transaction will be committed automatically
        });

        res.status(200).json({ message: "Task created successfully!" });
    } catch (error) {
        console.error("Error in createTask:", error.message);
        res.status(500).json({ message: "Could not create the Task!", error: error.message });
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
        const { emplyId } = req.query;
        // const emplyId = empId;
        console.log("emplyId :" + emplyId);
        // const data = await Event.findOne({ where: { eventId: eventId } ,include :[Customer]  })
        
        const { count, rows } = await AssignedTask.findAndCountAll({
            where: {
                emplyId,
            },
            include: [{model :Employee} , {model: Task}],
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