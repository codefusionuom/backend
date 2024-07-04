const asyncHandler = require("express-async-handler")
const db = require("../../config/db.config");
const Event = db.events;
const Customer =db.customers
const AssignedTasks=db.assignedTasks
const Services=db.services
const Employees=db.employees
const Tasks=db.tasks
const EventReferences=db.eventReferences





exports.postEventCode = asyncHandler(async(req, res) => {

  console.log("hhhhh",req.body);
  const {email,eventCode}=req.body
  await EventReferences.findOne({where:{email:email}}).then((data)=>{
    console.log("daa",data);
    if(data.referenceNumber == eventCode){
      console.log("ok");
           res.status(200).json(data.eventId)
    }
    else{
      console.log("error");
      res.status(400).json("Error")
    }
  })

  // const transporter = nodemailer.createTransport({
  //   service: 'Gmail',
  //   auth: {
  //     user: 'anonymousshield014@gmail.com',
  //     pass: 'ugqa dhrk zyze rneq',
  //   },
  // });

  // const mailOptions = {
  //   from: 'anonymousshield014@gmail.com',
  //   to: email,
  //   subject: 'Password reset OTP',
  //   text: `Your OTP (It is expired after 1 min) : ${otp}`,
  // };

  // transporter.sendMail(mailOptions, (error, info) => {
  //   if (error) {
  //     // return next(new AppError(error.message, 500));
  //     res
  //       .status(400)
  //       .send({ error });
  //   } else {
  //     res.json({ data: 'Your OTP has been sent to the email' });
  //   }
  // });
  res.status(200).json(1)
})

exports.getEventCode = asyncHandler(async(req, res) => {
    const eventcode = req.params.eventcode
    console.log(eventcode);
    // const data = await AssignedTasks.findAll({
    //     where: { eventId : 1 },
    //     include: [
    //       {
    //         model:Event,
    //         include: [
    //             {
    //               model: Services,
    //             },
    //           ],
    //       },
    //       {
    //         model:Employees,
    //       },
    //       {
    //         model:Tasks,
    //       },
    //     ],
    //   })
    // const data = await Tasks.findAll({
    //     where: { eventId : 1 },
    //     include: [
    //       {
    //         model:Event,
    //         include: [
    //             {
    //               model: Services,
    //             },
    //           ],
    //       },
    //       {
    //         model:AssignedTasks,
    //         include: [
    //             {
    //               model: Employees,
    //             },
    //           ],
    //       },
    //     ],
    //   })
    const data = await Event.findAll({
      where: { id : 1 },
      include: [
        {
          model:Services,
        },
        {
          model:Customer,
        },
        {
          model:Tasks,
          include: [
              {
                model: AssignedTasks,
                include: [
                  {
                    model: Employees,
                  },
                ],
              },
            ],
        },
      ],
    })
    console.log(data);
    // .then((data) => {res.status(200).json(data)}).catch((err) => {
    //   res.status(500).json({ error: err})
    // })
    if(data) res.status(200).json(data)
    if(!data) res.status(400).json({error: error})
  });