const asyncHandler = require("express-async-handler");
const db = require("../../../config/db.config");
const { Op, findOrCreate } = require("sequelize");
// const employeeModel = require("../../../model/employeeManager/employee.model");
const Employee = db.employees;



exports.createEmployee = asyncHandler(async (req, res) => {
    const { empId, empName, empType, empSalary, empAdd, empDepartment, empNumber } = req.body
    const [emp, created] = await Employee.findOrCreate({
        where: { empNumber: empNumber },
        defaults: {
            empName : empName,
            empType: empType,
            empSalary: empSalary,
            empAdd: empAdd,
            empDepartment: empDepartment,
            empNumber: empNumber,
            empId: empId,
        }
    });
    
    // console.log(emp); // 'sdepold'
    // console.log(user.job); // This may or may not be 'Technical Lead JavaScript'
    // console.log(created); // The boolean indicating whether this instance was just created
    if (created) {
        res.status(201).json({ message: "Employee Created", emp });
    }else {
        console.log("Employee Exists");
        res.status(400).send({ message: "Employee already exist" });
    }
})


exports.getEmployees = asyncHandler(async (req, res) => {
    console.log("-------------------------------enter to emp");
    // const page = req.params.page;
    // let limit = 4;
    // let offset = limit * (page - 1)
    try {
        const { count, rows } = await Employee.findAndCountAll({
            limit: 10,
            // limit: limit,
            // offset: offset,
        });

        const employees = rows;

        if (!employees || employees.length === 0) {
            res.status(200).json([]);
        } else {
            res.status(200).json(employees);
            // console.log(employees)
        }
    } catch (error) {
        console.error("Error fetching employees:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});



exports.getEmployeeByid = asyncHandler(async (req, res) => { 
    const { id } = req.params;
    const employee = await Employee.findByPk(id);
    if (employee === null) {
        console.log('Employee not found!');
        res.status(404).json({ error: 'Employee not found' });
    } else {
        res.status(200).json(employee);
    }
});



exports.updateEmployee = asyncHandler(async (req, res) => {
    const id = req.params.id;
    console.log(id, req.body,"update employee")
    try {

        const data = await Employee.update(req.body, {
            where: { id: id },
            // returning: true,
        })
        res.status(200).json(data)
    } catch (error) {
        res.status(400);
        throw new Error(error.message || "can't update Employee");
    }
})

exports.getEmployeeSearch = asyncHandler(async (req, res) => {
    const empName = req.query.empName;
    // console.log("+++++++++++++++++++++++++++++++++get Employee",empName);
    try {
        if(empName){
            const data = await Employee.findAll({
                where: {
                    empName: { 
                      [Op.like]: `%${empName}%`
                    }
                  },
                order: [['createdAt', 'DESC']]
            })
            // console.log(data);
            res.status(200).json(data)
        }
        else{
            const data = await Employee.findAll({
                order: [['createdAt', 'DESC']]
            }) 
            console.log(data);
            res.status(200).json(data)
        }
    } catch (error) {
        res.status(400);
        throw new Error(error.message || "can't get Employees");
    }
})


exports.deleteEmplloyee = asyncHandler(async (req, res) => {

    const id = req.params.id
    if (!id) {
        res.status(400).send({ message: "Employee not found" });
        return
    }
    try {

        const data = await Employee.destroy({
            where: { id: id },
            // returning: true
        })
        return res.status(200).json({ message: "Employee deleted successfully" });

    } catch (error) {
        res.status(400);
        throw new Error(error.message || "Couldn't remove employee");
    }


})








  