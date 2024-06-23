const asyncHandler = require("express-async-handler")
const db = require("../../../config/db.config");
const { Op } = require("sequelize");
const EventRequests = db.eventRequests;
const EventRequestServices= db.eventRequestServices;
const EventRequestServicesServices=db.eventRequestServicesServices
exports.createEventRequest=asyncHandler(async(req)=>{
console.log("create event request")
try {
const {customerId,services,note}=req.body
    const eventRequest = {
        customerId,
        note 
    };
    console.log(eventRequest);
await EventRequests.create(eventRequest).then(async(eventRequest)=>{
        await Promise.all(services.map(async (requestService) => {
            const {serviceArray,amount,note,payment,offers,serviceId,serviceDate}=requestService
    
            const newRequestService = {
                eventRequestId:eventRequest.id,
                amount,
                note,
                payment,
                offers,
                serviceDate,
                serviceId 
            }
          await EventRequestServices.create(newRequestService).then(async(eventRequestService)=>{
            await Promise.all(serviceArray.map(async (service) => {
                const key = Object.keys(service)[0];
                const value = service[key];
console.log(key,service);
                const newRequestServiceService = {   
                    eventRequestServiceId:eventRequestService.id,
                    serviceInputFieldId:key,
                    value:value
                }

                await EventRequestServicesServices.create(newRequestServiceService)
            }))
            })
          }));
    })

    // console.log("request entered",data.id)

} catch (error) {

    throw new Error(error || "can't create Customer Request");
}

})

exports.getAllEventRequests = asyncHandler(async (req,res) => {
    console.log("get all event requests");
    // const {status,active,limit}=req.body
    // const page = active;
    // let offset = limit * (page - 1)
  
    // console.log(page,req.body);
    try {

        const eventRequests = await EventRequests.findAndCountAll({
            include: [
                {
                    model: EventRequestServices,
                    as: 'eventRequestServices',
                    include: [
                        {
                            model: EventRequestServicesServices,
                            as: 'eventRequestServicesServices'
                        }
                    ]
                }
            ]
        });
          console.log(eventRequests);
     console.log("data")
     res.json(eventRequests)
    } catch (error) {
        res.status(400)
        throw new Error(error.message || "can't get CustomerRequest");
    }
})