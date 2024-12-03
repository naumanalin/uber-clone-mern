const dotenv = require('dotenv');
dotenv.config();
const express = require('express')
const cors = require('cors')
const connectToDB = require('./db/db')

connectToDB();

const app = express();

app.use(cors())

app.get('/', (req, res)=>{
    res.json({success:true, message:"hello uber backend/api's"})
})


module.exports = app;