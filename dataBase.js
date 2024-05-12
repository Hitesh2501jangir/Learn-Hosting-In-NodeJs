const mongoose = require('mongoose');
require('dotenv').config();
const mongodbURL = 'mongodb://localhost:27017/My-Hotel';
// const mongodbURL = process.env.MONGODB_URL;

mongoose.connect(mongodbURL);

const db = mongoose.connection;

db.on('connected',()=>{
    console.log("DataBase is Connected Successfully");
});

db.on('disconnected',()=>{
    console.log("DataBase is Disconnected");
})

db.on('error',(err)=>{
    console.log(err);
})

module.exports = db;

