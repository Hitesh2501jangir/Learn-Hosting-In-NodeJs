const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/test');

const db = mongoose.connection;

db.on('connected',()=>{
    console.log("Database is Connected");
});

db.on('disconnected',()=>{
    console.log('Database is Disconnected');
});

db.on('error',(err)=>{
    console.log(err);
})

module.exports = db;