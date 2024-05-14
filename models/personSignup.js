const mongoose = require('mongoose');


const personSchema = mongoose.Schema({
    username:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    password:{
        type:String,
        required:true,
    },

});

module.exports = mongoose.model('autnintication',personSchema);