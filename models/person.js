const mongoose = require('mongoose');

const personSchema = mongoose.Schema({
    person_name:{
        type:String,
        required:true,
    },
    age:{
        type:Number,
        required:true,
    },
    gender:{
        type:String,
        required:true,
        enum:["male","female","other"],
    },
    is_married:{
        type:Boolean,
        required:true,
    },
    post:{
        type:String,
        enum:["manager","chief","waiter","cleaner"],
        required:true,
    },
    salary:{
        type:Number,
        required:true,
    },
})

module.exports = mongoose.model('hotel_employ',personSchema);