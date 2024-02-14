const sql=require("mssql")

const server = process.env.AZURE_SQL_SERVER
const database =process.env.AZURE_SQL_DATABASE
const port =1433
const type = process.env.AZURE_SQL_AUTHENTICATIONTYPE;
const user = process.env.AZURE_SQL_USERNAME
const password =process.env.AZURE_SQL_PASSWORD

const config = {
    server,
    port,
    database,
    user,
    password,
    pool: {
        idleTimeoutMillis: 60000
      },
    requestTimeout : 60000,
    // authentication: {
    //     type
    // },
    options: {
        encrypt: true,
        trustServerCertificate:false
    }
}

async function connection(){
    try {
        await sql.connect(config)
        console.log("connected to database");
    } catch (error) {
        console.log("error",error);
    }
    finally{
        await sql.close();
    }
}

module.exports={
    connection
}

