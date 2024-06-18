const express = require('express')
const app = express()
const cors = require('cors')
require('dotenv').config();
const database=require("./config/mssql.js")


app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())

// async function runScript(){
//     await database.connection()
//   }
// runScript() 


const db = require("./config/db.config.js");
db.sequelize.sync();

const customerManagerRouter = require("./router/stdioSide/customerManager/index.js");
const { notFound, errorHandler } = require('./middleware/errorHandler.js');

const stockManagerRouter = require("./router/stdioSide/StockManager/index.js")

app.use("/customerManager" , customerManagerRouter)
app.use("/stockManager" , stockManagerRouter )



//error handling middlewares
app.use(notFound)
app.use(errorHandler)

app.listen(process.env.PORT, () => console.log(`App started on port: ${process.env.PORT}`))