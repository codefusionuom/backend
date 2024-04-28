const asyncHandler = require("express-async-handler")
const db = require("../../../config/db.config");
const { Op, Sequelize } = require("sequelize");
const customerServices = db.customerServices;


exports.createCustomerServices = asyncHandler(async (req, res) => {

    console.log(req.body);
const {serviceName,description,inputFields,selectFields,selectOptions,price,parentService}=req.body

    try {
        const customerService = {
            serviceName, description, price,parentService,
            inputFields: JSON.stringify(inputFields),
            selectFields: JSON.stringify(selectFields),
        };
         console.log(customerService);
         const data = await customerServices.create(customerService)
         res.status(200).json(data);

    } catch (error) {
        res.status(400);
        throw new Error(error.message || "Some error occurred while creating the Customer");
    }
})


exports.getCustomerServices = asyncHandler(async (req, res) => {
   
    try {
        let customerServicelist=[]
        let customerServicelistfinal=[]
        const data = await customerServices.findAll({attributes: [ [Sequelize.literal('id'), 'value'], [Sequelize.literal('serviceName'), 'label'],'parentService']})
        // console.log(data);
        data.forEach(i => {
            i.dataValues.children=[]
            //console.log("i----------",i.dataValues);
            data.forEach(j => {
                if(i.dataValues.value == j.dataValues.parentService){
                    // console.log(i.dataValues.serviceName,"parent of",j.dataValues.dataValues);
                    i.dataValues.children.push(j.dataValues)
                }
                
            });
            
            customerServicelist.push(i.dataValues)
             //console.log("--------------------------------------------",i.dataValues);
        });

        customerServicelist.forEach(element => {
           // console.log(element);
            if(!element.parentService){
                customerServicelistfinal.push(element)
            }
        });
         //console.log(customerServicelist,"ff");
        res.status(200).json(customerServicelistfinal)

         } catch (error) {
        res.status(400);
        throw new Error(error.message || "can't get Customer");
    }
})


exports.getCustomerService = asyncHandler(async (req, res) => {
    const serviceId = req.params.id
    try {
       
        const data = await customerServices.findOne({where:{id:serviceId}})
    
        
       console.log(data);
       const{id,serviceName,description,inputFields,selectFields,parentService,price}=data
        
        res.status(200).json({id,serviceName,description,inputFields:JSON.parse(inputFields),selectFields:JSON.parse(selectFields),parentService,price})

         } catch (error) {
        res.status(400);
        throw new Error(error.message || "can't get Customer")
    }
})


exports.updateCustomerService = asyncHandler(async (req, res) => {
    const serviceId = req.params.id
    console.log(serviceId);
    try{
        const {serviceName,description,inputFields,selectFields,selectOptions,price,parentService}=req.body
        const customerService = {
            serviceName, description, price,parentService,
            inputFields: JSON.stringify(inputFields),
            selectFields: JSON.stringify(selectFields),
        };
         console.log(customerService);
        const data = await customerServices.update(customerService,{where:{id:serviceId},returning: true,})
    
        
       console.log(data); 
        res.status(200).json({serviceId})

         }
    catch (error) {
        res.status(400);
        throw new Error(error.message || "can't get Customer")
    }
})


exports.deleteCustomerService = asyncHandler(async (req, res) => {
    const serviceId = req.params.id
    console.log(serviceId);
    try {
        const data = await customerServices.destroy({
            where: { id: serviceId },
            returning: true
        })
        res.status(200).json(data);
        
         } catch (error) {
        res.status(400);
        throw new Error(error.message || "can't get Customer")
    }
})

