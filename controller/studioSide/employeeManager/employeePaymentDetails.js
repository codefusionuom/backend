const asyncHandler = require("express-async-handler");
const db = require("../../../config/db.config");

const EmployeePaymentDetails = db.employeePaymentDetails;



exports.createEmployeePaymentDetails = asyncHandler(async (req, res) => {
    const { id,bank,epfNumber,accoutNumber,overtimeRate,empSalary} = req.body
    const [empPaymentDetails, created] = await EmployeePaymentDetails.findOrCreate({
        where: { id: id },
        defaults: {
            bank : bank,
            epfNumber: epfNumber,
            accountNumber: accoutNumber,
            overtimeRate: overtimeRate,
            empSalary: empSalary,
        }
    });
    
    console.log(empPaymentDetails); // 'sdepold'
    // console.log(user.job); // This may or may not be 'Technical Lead JavaScript'
    console.log(created); // The boolean indicating whether this instance was just created
    if (created) {
        res.status(201).json({ message: "Employee Created", empPaymentDetails });
    }else {
        console.log("Employee Exists");
        res.status(400).send({ message: "Employee already exist" });
    }
})


exports.getEmployeePaymentDetailsByid = asyncHandler(async (req, res) => {
    const { id } = req.params; // Assuming you're passing id as a route parameter
    const employeepaymentdetails = await EmployeePaymentDetails.findByPk(id);
    if (employeepaymentdetails === null) {
        console.log('Employee Payment Details not found!');
        res.status(404).json({ error: 'Employee Payment Details not found' });
    } else {
        res.status(200).json(employeepaymentdetails);
    }
});


exports.updateEmployeePaymentDatails = asyncHandler(async (req, res) => {
    const id = req.params.id;
    console.log(id, req.body,"update employee payment details")
    try {

        const data = await EmployeePaymentDetails.update(req.body, {
            where: { id: id },
            // returning: true,
        })
        res.status(200).json(data)
    } catch (error) {
        res.status(400);
        throw new Error(error.message || "can't update Employee payment details");
    }
})