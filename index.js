const express = require('express')
const app = express();
const db = require('./dataBase');
const person = require('./models/person');
const personRoute = require('./routes/personroute');
const { config } = require('dotenv');
require('dotenv').config();
app.use(express.json());
const passport = require('./auth');
const PORT = process.env.PORT || 3000;

//middleware
const logRequest = (req,res,next)=>{
    console.log(`(${new Date().toLocaleString()}):Request is made to :${req.originalUrl}`);
    next();
}

app.use(passport.initialize());
const localAuthMiddleware = passport.authenticate('local',{session:false});



app.use(logRequest);
// app.use(localAuthMiddleware);
app.get('/',(req,res)=>{
    res.send("Hi its Working");
})
app.use('/person',personRoute);
app.listen(PORT,()=>{
    console.log("Server is listen on port-3000");
})