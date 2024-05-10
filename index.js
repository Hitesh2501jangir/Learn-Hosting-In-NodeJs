const express = require('express')
const app = express();
const db = require('./dataBase');
const person = require('./models/person');
const personRoute = require('./routes/personroute');
const { config } = require('dotenv');
require('dotenv').config();
app.use(express.json());
const PORT = process.env.PORT;


app.get('/',(req,res)=>{
    res.send("Hi its Working");
})
app.use('/person',personRoute);
app.listen(PORT,()=>{
    console.log("Server is listen on port-3000");
})