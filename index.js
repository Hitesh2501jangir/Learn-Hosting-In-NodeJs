const express = require('express')
const app = express();
const db = require('./dataBase');
const person = require('./models/person');
const personRoute = require('./routes/personroute');
app.use(express.json());




app.use('/person',personRoute);
app.listen(3000,()=>{
    console.log("Server is listen on port-3000");
})