const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();
// const database=require("./config/mssql.js")
const socketIo = require('socket.io');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(bodyParser.json());
// app.use(cookieParser());

const db = require('./config/db.config.js');
db.sequelize.sync();


const { createCustomerRequest } = require('./controller/studioSide/customerManager/customerRequest.js');
const customerManagerRouter=require("./router/stdioSide/customerManager/index.js");
const eventMangerRouter = require('./router/stdioSide/eventManager/eventManager.js')
const employeeManagerRouter = require('./router/stdioSide/employeeManager/employee.js')
const superAdminRouter = require('./router/stdioSide/superAdmin/index.js');

const { notFound, errorHandler } = require('./middleware/errorHandler.js');

app.use("/customerManager",customerManagerRouter)
app.use("/eventManager", eventMangerRouter)
app.use("/employeeManager", employeeManagerRouter)
app.use('/superAdmin', superAdminRouter);


// const { notFound, errorHandler } = require('./middleware/errorHandler.js');





const server = app.listen(process.env.PORT, () => console.log(`App started on port: ${process.env.PORT}`));

// Set up Socket.IO
const io = socketIo(server,{
    pingTimeout: 60000,
    cors: {
     origin: ["http://localhost:3000",'http://localhost:3001']
    }});

io.on('connection', (socket) => {
  console.log('A user connected');

  socket.on('customerRequest', (req) => {
    // console.log('customer request',req);
    createCustomerRequest(req)
    io.emit("customerRequest",req)
  })
});

//error handling middlewares
app.use(notFound)
app.use(errorHandler)