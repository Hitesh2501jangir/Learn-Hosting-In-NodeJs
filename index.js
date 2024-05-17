const express = require('express');
const app = express();
const db = require('./database');
const personRoute = require('./routes/signupData');
app.use(express.json());
const passport = require('./auth');
app.use(passport.initialize());
const localMiddleWare = passport.authenticate('local',{session:false});
// app.use();


app.use('/person',personRoute);
app.get('/',localMiddleWare ,(req,res)=>{
    res.send("Hello Its working");
})
app.listen(3000,()=>{
    console.log("Server is listen on port-3000");
})