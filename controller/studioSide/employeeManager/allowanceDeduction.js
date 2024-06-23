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


exports.getAllowance = asyncHandler(async (req, res) => {
    // const page = req.params.page;
    // let limit = 4;
    // let offset = limit * (page - 1)
    try {
        const { count, rows } = await paymentAllowanceDeduction.findAndCountAll({
            //   include: [{ model: Employee, where: { empId: id }, attributes: ['empName'], }],
            limit: 10,
            // limit: limit,
            // offset: offset,
        });

        const allowance = rows;

        if (!allowance || allowance.length === 0) {
            res.status(200).json([]);
        } else {
            res.status(200).json(allowance);
            console.log(allowance)
        }
    } catch (error) {
        console.error("Error fetching Allowance:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

exports.getAllowanceByid = asyncHandler(async (req, res) => {
    const { id } = req.params; // Assuming you're passing id as a route parameter
    const allowance = await paymentAllowanceDeduction.findByPk(id);
    if (allowance === null) {
        console.log('Allowance Record not found!');
        res.status(404).json({ error: 'Allowance Record not found' });
    } else {
        res.status(200).json(advance);
    }
});


exports.deleteAllowance = asyncHandler(async (req, res) => {

    const id = req.params.id
    if (!id) {
        res.status(400).send({ message: "Allowance not found" });
        return
    }
    try {

        const data = await paymentAllowanceDeduction.destroy({
            where: { id: id },
            // returning: true
        })
        return res.status(200).json({ message: "Allowance deleted successfully" });

    } catch (error) {
        res.status(400);
        throw new Error(error.message || "Couldn't remove Allowance");
    }


})





// exports.updateAllowance = asyncHandler(async (req, res) => {
//     const id = req.params.id;
//     const { newAdvancePaidAmount, newpaidstatus } = req.body;
//     console.log(id, req.body,"update advance record")
//     try {

//         const data = await paymentAllowanceDeduction.update({
//             advancePaidAmount: newAdvancePaidAmount,
//             advancePaidStatus: newpaidstatus
//         }, {

//             where: { id: id },
//             // returning: true,
//         })
//         res.status(200).json(data)
//     } catch (error) {
//         res.status(400);
//         throw new Error(error.message || "can't update Advance Record");
//     }
// })