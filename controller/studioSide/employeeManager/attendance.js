const asyncHandler = require("express-async-handler");
const { Op } = require('sequelize');
const { Sequelize, Model, DataTypes } = require('sequelize');
const db = require("../../../config/db.config");
const Attendance = db.attendance;
const Employee = db.employees;


exports.createAttendance = asyncHandler(async (req, res) => {
      
      const {  id, checkIn, checkOut, dayType, leaveType, dateString, checkInSeconds, checkOutSeconds } = req.body;
  
    //   var selectedDateWithOnedayOff = new Date(date);
    //   const correctedDate =  new Date( selectedDateWithOnedayOff.getTime() + Math.abs(selectedDateWithOnedayOff.getTimezoneOffset()*60000) );

      const [attendance, created] = await Attendance.findOrCreate({
          where: { id: id, date: dateString  },
          defaults: {
              checkIn : checkIn,
              checkOut: checkOut,
              dayType: dayType,
              leaveType: leaveType,
              checkInSeconds: checkInSeconds,
              checkOutSeconds: checkOutSeconds,
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



exports.getCheckInTotal = asyncHandler(async (req, res) => {
    try {
        const id = req.query.id;  // Access the id from query parameters
        const month = req.query.month;  // Access other parameters
        const data = await Attendance.sum('checkInSeconds', {
            where: {
                id: id,
                date: {
                    [Op.like]: `${month}%` 
                }
            }
        });
        if (data === null) {
            res.status(200).json({ totalCheckIns: 0 }); // Assuming you want to return 0 if no data found
        } else {
            res.status(200).json({ totalCheckIns: data });
        }
    } catch (error) {
        console.error("Error fetching CheckIn:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

exports.getCheckOutTotal = asyncHandler(async (req, res) => {
    try {
        const id = req.query.id;  // Access the id from query parameters
        const month = req.query.month;  // Access other parameters
        const data = await Attendance.sum('checkOutSeconds', {
            where: {
                id: id,
                date: {
                    [Op.like]: `${month}%` 
                }
            }
        });
        if (data === null) {
            res.status(200).json({ totalCheckOuts: 0 }); // Assuming you want to return 0 if no data found
        } else {
            res.status(200).json({ totalCheckOuts: data });
        }
    } catch (error) {
        console.error("Error fetching CheckIn:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});


// exports.getCheckInTotal = asyncHandler(async (req, res) => {
//         const id = req.query.id;  // Access the id from query parameters
//     const month = req.query.sqlFormattedDate;  // Access other parameters

//         const data = await Attendance.findAll('checkIn', {
//             where: {
//                 id: id,
//                 date: {
//                     [Sequelize.Op.like]: `${month}%` 
//                 }
//             },
//             attributes: [
//                 [sequelize.fn('SUM', sequelize.fn('TIME_TO_SEC', sequelize.col('timeValue'))), 'totalSeconds']
//               ],
//             }).then(result => {
//               const totalSeconds = result[0].dataValues.totalSeconds;
//               console.log('Total seconds:', totalSeconds);
//             }).catch(err => {
//               console.error('Error:', err);
//             });
// });

// TimeModel.findAll({
//     attributes: [
//       [sequelize.fn('SUM', sequelize.fn('TIME_TO_SEC', sequelize.col('timeValue'))), 'totalSeconds']
//     ],
//   }).then(result => {
//     const totalSeconds = result[0].dataValues.totalSeconds;
//     console.log('Total seconds:', totalSeconds);
//   }).catch(err => {
//     console.error('Error:', err);
//   });
