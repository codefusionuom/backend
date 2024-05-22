const asyncHandler = require("express-async-handler");
const db = require("../../../config/db.config");
const AssignedTask = db.assignedTasks;


const createAssignedTask = asyncHandler(async (req, res) => {
   try {
     const { eventId , employeeId , taskId } = req.body;
 
     const assignedTask = await AssignedTask.create({
         eventId,
         empId : employeeId,
         taskId
     })
     if (!assignedTask)  return res.status(400).json({ message: "Task assigning  was not successful!" });
     res.status(200).json({ message: "Task assigned successfully!" });
 
   } catch (error) {
    res.status(500).json({ message: "Could not create the Task!" , error: error.message  });
   }
})
module.exports = {
    createAssignedTask
}