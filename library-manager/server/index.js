const express= require("express");
const { connection } = require("./config/db");

require("dotenv").config()

const app = express();




app.listen(process.env.port, async() => {
    try {
        await connection;
        console.log("Connected to DB");
    } catch (error) {
        console.log("Error while connecting to DB");
        console.log(error);
    }
    console.log(`Running at port ${process.env.port}`);
})