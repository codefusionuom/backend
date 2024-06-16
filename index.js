const express = require('express');
const app = express();
const cors = require('cors');
require('dotenv').config();
const database = require('./config/mssql.js');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

const db = require('./config/db.config.js');
db.sequelize.sync();

const customerManagerRouter = require('./router/stdioSide/customerManager/index.js');
const superAdminRouter = require('./router/stdioSide/superAdmin/index.js');

const { notFound, errorHandler } = require('./middleware/errorHandler.js');

app.use('/customerManager', customerManagerRouter);
app.use('/superAdmin', superAdminRouter);

//error handling middlewares
app.use(notFound);
app.use(errorHandler);

app.listen(process.env.PORT, () =>
  console.log(`App started on port: ${process.env.PORT}`)
);
