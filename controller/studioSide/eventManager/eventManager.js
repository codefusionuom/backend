const asyncHandler = require("express-async-handler");
const db = require("../../../config/db.config");
// const Event = require("../../../model/eventManager/event.model");
const Event = db.events;
const { Op, Sequelize } = require("sequelize");
const crypto = require("crypto");
let existingEvent;
const Customer = db.customers;
const Employee = db.employee;

const createEvent = asyncHandler(async (req, res) => {
  console.log("yyyyyyyyyyyyyyyy");
  try {

    
    const {  serviceType, status, customerId } = req.body;
    let { date} = req.body;
    console.log("date log: " , date);
    // date

    var selectedDateWithOnedayOff = new Date(date);
    const correctedDate =  new Date( selectedDateWithOnedayOff.getTime() + Math.abs(selectedDateWithOnedayOff.getTimezoneOffset()*60000) );
    // Validate input fields
    // if (!eventId || !serviceType || !status || !date || !customerId) {
      //   return res.status(400).json({ message: "Please fill out all the fields!" });
      // }
      const  eventId = generateId()
      console.log("serviceType: ", serviceType);
      console.log("status: ", status);
      console.log("date: ", date);
      console.log("corrected date: ", correctedDate);
      console.log("eveent id: ", eventId);
      console.log("custormer : ", customerId);
   
      console.log("{} event ID :" ,eventId);
      if(eventId){
      existingEvent = await Event.findOne({ where: { eventId: eventId } })
      // .then(function (event) {
      //   console.log("Eveent B : ", event ) ;
      // return res.status(400).json({ message: "Event already exists"  , existingEvent : existingEvent });

      // }).catch(function (error) {
      //   console.log( "Event B error: ", error);
      // })

    // eventId = "gnsiphnsiphins";
      }
    console.log("existing ev :" ,existingEvent);
   
    if (existingEvent) {
      console.log("existing event :" ,existingEvent);
      return res.status(400).json({ message: "Event already exists"  , existingEvent : existingEvent });
    }

    // Create the event
    const event = await Event.create({
     
      eventId : eventId,
      serviceType,
      status,
      date : correctedDate,//By calling toISOString() on the correctedDate, you ensure that the date field is stored as a string in the format expected by Sequelize.
      customerId,
    });
    if(!event) res.status(400).json({ message: "Event creation was not successful!" });
    // Send a success response
    res.status(200).json({event: event});
  } catch (error) {
    console.log("error :", error);
    // Send an error response
    res.status(500).json({ message: "Could not create the event!" , error: error  });
  }
});

const updateEvent =  asyncHandler(async( req ,res ) => {
try {
  console.log("llllllllllllllllllllllllll");
    const { serviceType , status , date , customerId } = req.body;
    const eventId = req.params.eventId;
    console.log("fgggggggggggggggggg");
  console.log(eventId);
    const packedtoUpdate = {}
  
    if(serviceType) packedtoUpdate.serviceType = serviceType;
    if(status) packedtoUpdate.status = status;
    if(date) packedtoUpdate.date = date;
    if(customerId) packedtoUpdate.customerId = customerId;
  
    const upEvent = await Event.update(packedtoUpdate , {where :{eventId : eventId}})
    res.send(upEvent)
} catch (error) {
  res.status(400).json({ message: error.message });
}
})

const allEvents = asyncHandler(async(req, res) =>{
 try {
   const events = await Event.findAll( { include: [Customer]});
   if(!events) res.status(400).json({ message: "Could not get events !"});
 res.status(200).json({events : events})
 } catch (error) {
  res.status(400).json({ message: error.message });
 }
})



const filterEventsBetween = asyncHandler(async(req, res) =>{

  const startedDate = new Date("2024-02-28T18:30:00.000Z");
  const endDate = new Date("2024-03-09T18:30:00.000Z");
  
  // Format the dates to match the database format
  const formatDatabaseDate = (date) => {
    return date.toISOString();
  };
  
  const formattedStartDate = formatDatabaseDate(startedDate);
  const formattedEndDate = formatDatabaseDate(endDate);
  
  // Find events between the specified dates
  Event.findAll({
    where: {
      date: {
        [Op.between]: [formattedStartDate, formattedEndDate],
      },
    },
  })
    .then((result) => res.status(200).json({ data: result }))
    .catch((error) => res.status(404).json({ errorInfo: error }));
})

const getOnedayEvents = asyncHandler(async (req, res) => {
  await Event.findAll({
    where: {
      serviceType: "one day services"
    },
    include: [Customer]
  })
    .then((result) => res.status(200).json({ oneDayEvents: result }))
    .catch((error) => res.status(404).json({ error: error }));

   
    // var datetime = new Date();
    // console.log(datetime);
});

const getTodayEvents =  asyncHandler(async(req, res) =>{
  try {
    var todayWithOnedayOff = new Date();
    console.log("todayWithOnedayOff : " , todayWithOnedayOff);
    const today =  new Date( todayWithOnedayOff.getTime() + Math.abs(todayWithOnedayOff.getTimezoneOffset()*60000) );
    
  console.log("today  :" , today);
  const startOfDay = new Date(today);
  startOfDay.setHours(0, 0, 0, 0);
  console.log("startOfDay :" , startOfDay);
  // console.log("start Of Day Fun:" , setToStartOfDay(today));
  // const todayStart = moment().startOf('day').toISOString();

  const todayBegin = new Date(setToStartOfDay(today));

  
  console.log("0.0.0. :", todayBegin); // Outputs: "2024-03-13T00:00:00.000Z"

  const endOfDay = new Date(today);
  endOfDay.setUTCHours(23, 59, 59, 999);
  console.log("endOfDay :" , endOfDay);


  
    await Event.findAll({
      where: {
        date: {
          [Op.between] : [todayBegin , endOfDay ]
        }
      }
    }).then((result) => res.status(200).json({ todayEvents: result }))
    .catch((error) => res.status(404).json({ error: error }));
  } catch (error) {
    res.status(404).json({ error: error });
  }
})

const getSelectedDayEvents =  asyncHandler(async(req, res) =>{
  try {
    let { date  } = req.body;
    console.log("req =" , req.body);
    console.log("REceved date :" , date); 
    var todayWithOnedayOff = new Date(date);
    console.log("todayWithOnedayOff : " , todayWithOnedayOff);
    const today =  new Date( todayWithOnedayOff.getTime() + Math.abs(todayWithOnedayOff.getTimezoneOffset()*60000) );
    
  console.log("today  :" , today);
  const startOfDay = new Date(today);
  startOfDay.setHours(0, 0, 0, 0);
  console.log("startOfDay :" , startOfDay);
  // console.log("start Of Day Fun:" , setToStartOfDay(today));
  // const todayStart = moment().startOf('day').toISOString();

  const todayBegin = new Date(setToStartOfDay(today));

  
  console.log("0.0.0. :", todayBegin); // Outputs: "2024-03-13T00:00:00.000Z"

  const endOfDay = new Date(today);
  endOfDay.setUTCHours(23, 59, 59, 999);
  console.log("endOfDay :" , endOfDay);


  
    await Event.findAll({
      where: {
        date: {
          [Op.between] : [todayBegin , endOfDay ]
        }
      }
      ,
      include: [Customer]
    }).then((result) => res.status(200).json({ todayEvents: result }))
    .catch((error) => res.status(404).json({ error: error }));
  } catch (error) {
    res.status(404).json({ error: error });
  }
})


const getCustomer= asyncHandler( async(req,res) => {
  console.log("searching customer")
  const {mobilePhone} =req.body;
  console.log(mobilePhone);
  try {
    // { where: { eventId: eventId } }
      const data = await Customer.findAll({
        where: {
          mobilePhone: { 
            [Op.like]: `%${mobilePhone}%`
          },
        },  
      });
      console.log("data "+ data);
      console.log( data);
        res.status(200).json(data)  
  } catch (error) {
      res.status(400)
  throw new Error(error.message || "can't find Customer") 
  }

}

)

const getEvent = asyncHandler(async(req, res) => {
  const { eventId } = req.params;
  console.log(eventId);
  const data = await Event.findOne({ where: { eventId: eventId } ,include :[Customer]  })
  // .then((data) => {res.status(200).json(data)}).catch((err) => {
  //   res.status(500).json({ error: err})
  // })
  if(data) res.status(200).json(data)
  if(!data) res.status(400).json({error: error})
});

function setToStartOfDay(date) {
  const newDate = new Date(date);
  newDate.setUTCHours(0, 0, 0, 0); // Set hours, minutes, seconds, milliseconds to 0
  return newDate;
}

const todayStart = setToStartOfDay(new Date()); // Get today's start in UTC
console.log(todayStart); // Output: 2024-03-13T00:00:00.000Z






const generateId = ()=>{
  // Generate random bytes
  const randomBytes = crypto.randomBytes(16);

  // Encode the random bytes in base64 and replace special characters
  const generateId = randomBytes.toString("base64").replace(/\//g, '_').replace(/\+/g, '-').replace(/=/g, '');

  console.log("generateId : " , generateId);
  return generateId;

}



const getAllEmployees = asyncHandler(async(req, res) =>{
  try {
    const employees = await Employee.findAll( { include: [Employee]});
    if(!employees) res.status(400).json({ message: "Could not get employees !"});
  res.status(200).json({employees : employees})
  } catch (error) {
   res.status(400).json({ message: error.message });
  }
 })
 

module.exports = {
  createEvent,
  updateEvent,
  allEvents,
  filterEventsBetween,
  getOnedayEvents,
  getTodayEvents,
  getSelectedDayEvents,
  getCustomer,
  getEvent,
  getAllEmployees
};
