const express = require('express')
const app = express()
const cors = require('cors')
require('dotenv').config();
// const database=require("./config/mssql.js")
const socketIo = require('socket.io');

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())

// async function runScript(){
//     await database.connection()
//   }
// runScript()


const db = require("./config/db.config.js");
db.sequelize.sync();


const { createCustomerRequest } = require('./controller/studioSide/customerManager/customerRequest.js');
const customerManagerRouter=require("./router/stdioSide/customerManager/index.js");
const eventMangerRouter = require('./router/stdioSide/eventManager/eventManager.js')


const { notFound, errorHandler } = require('./middleware/errorHandler.js');

app.use("/customerManager",customerManagerRouter)
app.use("/eventManager", eventMangerRouter)


app.get('/test', (req, res) => res.send('Hello I am a dummy test router!'))






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