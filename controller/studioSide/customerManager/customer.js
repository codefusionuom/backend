const asyncHandler = require("express-async-handler")
const db = require("../../../config/db.config");
const { Op } = require("sequelize");
const Customer = db.customers;



exports.createCustomers = asyncHandler(async (req, res) => {

    const { firstname, lastname, email, address, mobilePhone, status } = req.body
    if (email) {
        const oldCustomer = await Customer.findOne({ where: { email: email } })
        if (oldCustomer) {
            console.log(oldCustomer)
            res.status(400).send({ message: "Customer already exist" });
            return
        }
    } else if (mobilePhone) {
        const oldCustomer = await Customer.findOne({ where: { mobilePhone: mobilePhone } })
        if (oldCustomer) {
            res.status(400).send({ message: "Customer already exist" });
            return
        }
    }
    else {
        res.status(400).send({ message: "Customer required mobilephone or email" });
        return
    }

    try {
        const customer = {
            firstname, lastname, email, address, mobilePhone,
            status: status ? status : false
        };
        console.log(customer);
        const data = await Customer.create(customer)
        res.status(200).json(data);

    } catch (error) {
        res.status(400);
        throw new Error(error.message || "Some error occurred while creating the Customer");
    }
})


exports.deleteCustomer = asyncHandler(async (req, res) => {

    const id = req.params.id
    if (!id) {
        res.status(400).send({ message: "can't remove ,invalid customer" });
        return
    }
    try {

        const data = await Customer.findOne({
            where: { id: id },
            returning: true
        })
        res.status(200).json(data);

    } catch (error) {
        res.status(400);
        throw new Error(error.message || "can't remove Customer");
    }


})


exports.updateCustomer = asyncHandler(async (req, res) => {
    const id = req.params.id;
    console.log(id, req.body,"update customer")
    try {

        const data = await Customer.update(req.body, {
            where: { id: id },
            returning: true,
        })
        res.status(200).json(data)
    } catch (error) {
        res.status(400);
        throw new Error(error.message || "can't update Customer");
    }
})
exports.getCustomers = asyncHandler(async (req, res) => {
    const page = req.params.page;
    let limit = 4;
    let offset = limit * (page - 1)
    try {
        const data = await Customer.findAndCountAll({
            limit: limit,
            offset: offset,
        })
        res.status(200).json(data)

    } catch (error) {
        res.status(400);
        throw new Error(error.message || "can't get Customer");
    }
})


exports.getSearchCustomer=async(req,res)=>{
    console.log("serch customer")
    const query=req.query.search;
    try {
        const data =await Customer.findOne({
                where: {
                    [Op.or]: [
                        { mobilePhone: query },
                        { email: query },
                      ] 
                }
          })
          res.status(200).json(data)  
    } catch (error) {
        res.status(400)
    throw new Error(error.message || "can't find Customer") 
    }

}

