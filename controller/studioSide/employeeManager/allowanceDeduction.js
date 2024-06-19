const asyncHandler = require("express-async-handler");
const db = require("../../../config/db.config");
const { Op, findOrCreate } = require("sequelize");
const paymentAllowanceDeduction = db.paymentAllowanceDeduction;

exports.createAllowanceDeduction = asyncHandler(async (req, res) => {
    const { allowanceorDeduction, allowanceDeductionName } = req.body
    const [record, created] = await paymentAllowanceDeduction.findOrCreate({
        where: { allowanceDeduction: allowanceorDeduction,
            allowanceDeductionName: allowanceDeductionName
         },
        defaults: {
            allowanceDeduction : allowanceorDeduction,
            allowanceDeductionName: allowanceDeductionName,
        }
    });
    
    // console.log(emp); // 'sdepold'
    // console.log(user.job); // This may or may not be 'Technical Lead JavaScript'
    // console.log(created); // The boolean indicating whether this instance was just created
    if (created) {
        res.status(201).json({ message: "Record Created", record });
    }else {
        console.log("Employee Exists");
        res.status(400).send({ message: "Record already exist" });
    }
})