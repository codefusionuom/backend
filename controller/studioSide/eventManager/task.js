const asyncHandler = require("express-async-handler");
// const Task = require("../../../model/eventManager/task.model");
const db = require("../../../config/db.config");
const Task = db.tasks;
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
        const task = await Task.create({
            eventId : eventId,
            taskName : taskName,
            serviceType : serviceType,
            department : department,
            status : status,
            description : description
        })
    if(!task) return res.status(400).json({ message: "Task creation was not successful!" });
        res.status(200).json({ message: "Task created successfully!" });
    } catch (error) {
        res.status(500).json({ message: "Could not create the Task!" , error: error.message  });        
    }
});



module.exports = {createTask}