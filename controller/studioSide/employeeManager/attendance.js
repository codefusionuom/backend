const asyncHandler = require("express-async-handler");
const db = require("../../../config/db.config");
const Attendance = db.attendance;
const Employee = db.employees;


exports.createAttendance = asyncHandler(async (req, res) => {
      
      const {  id, checkIn, checkOut, dayType, leaveType, date } = req.body;
  
      var selectedDateWithOnedayOff = new Date(date);
      const correctedDate =  new Date( selectedDateWithOnedayOff.getTime() + Math.abs(selectedDateWithOnedayOff.getTimezoneOffset()*60000) );

      const [attendance, created] = await Attendance.findOrCreate({
          where: { id: id, date: correctedDate  },
          defaults: {
              checkIn : checkIn,
              checkOut: checkOut,
              dayType: dayType,
              leaveType: leaveType,
          }
      });
      
      // console.log(emp); // 'sdepold'
      // console.log(user.job); // This may or may not be 'Technical Lead JavaScript'
      // console.log(created); // The boolean indicating whether this instance was just created
      if (created) {
          res.status(201).json({ message: "Attendance Record Created", attendance });
      }else {
          console.log("Employee Exists");
          res.status(400).send({ message: "Attendance Record already exist" });
      }
  });

exports.getAttendance = asyncHandler(async (req, res) => {
    // const page = req.params.page;
    // let limit = 4;
    // let offset = limit * (page - 1)
    try {
        const { count, rows } = await Attendance.findAndCountAll({
            include: [
                {
                  model: Employee,
                  attributes: ['empName'],
                //   where: {
  
                //       [Op.or]: [
                //           { mobilePhone: query },
                //           { email: query },
                         
                //         ] 
                //   }
                }
              ],
            limit: 10,
            // limit: limit,
            // offset: offset,
        });

        const attendance = rows;

        if (!attendance || attendance.length === 0) {
            res.status(200).json([]);
        } else {
            res.status(200).json(attendance);
            console.log(attendance)
        }
    } catch (error) {
        console.error("Error fetching employees:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});