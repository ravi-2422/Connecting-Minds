const express = require('express');
const app = express();
const connectDatebase = require('./config/dbConfig');
app.use(express.json());
require("dotenv").config({path : './config/config.env'});
const PORT = 5000;

// connecting the database
connectDatebase();

// routing

const userRouter = require('./routes/userRoutes');

app.use("/api/user", userRouter);

app.listen(PORT,()=>{
    console.log(`server is running on port ${PORT}`);
})