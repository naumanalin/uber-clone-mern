const dotenv = require('dotenv');
dotenv.config();
const express = require('express')
const cors = require('cors')
const connectToDB = require('./db/db')
const userRoutes = require('./routes/user.route')
const captainRoutes = require('./routes/captain.route')


connectToDB();

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended:true}))
app.use(cors())

app.get('/', (req, res)=>{
    res.json({success:true, message:"hello uber backend/api's"})
})

app.use('/users', userRoutes);
app.use('/captains', captainRoutes)

module.exports = app;