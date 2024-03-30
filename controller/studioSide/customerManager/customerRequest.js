const asyncHandler = require("express-async-handler")
const db = require("../../../config/db.config");
const { Op } = require("sequelize");
const CustomerRequests = db.customerRequests;

exports.createCustomerRequest=asyncHandler(async(req)=>{
console.log("create customer request")
try {
const {firstname, lastname, email, address, mobilePhone,serviceType,serviceDate,note}=req
    const customerRequest = {
        firstname, lastname, email, address, mobilePhone,serviceType,serviceDate,note
        
    };
    console.log(customerRequest);
    const data = await CustomerRequests.create(customerRequest)
    res.status(200).json(data);

} catch (error) {
    res.status(400);
    throw new Error(error.message || "can't create Customer Request");
}

})

exports.getCustomerRequests = asyncHandler(async (req, res) => {
    const page = req.params.page;
    let limit = 4;
    let offset = limit * (page - 1)
    try {
        const data = await CustomerRequests.findAndCountAll({
            limit: limit,
            offset: offset,
            order: [['createdAt', 'DESC']],
        })
        res.status(200).json(data)

    } catch (error) {
        res.status(400);
        throw new Error(error.message || "can't get Customer");
    }
})