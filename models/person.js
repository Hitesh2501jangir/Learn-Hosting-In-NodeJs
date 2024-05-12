const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

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
    username:{
        type:String,
        require:true,
    },
    password:{
        type:String,
        require:true,
    },
})

//hashing of password
personSchema.pre('save',async (next)=>{
    // const person = this;

    //check condition for request data is password or any other data
    // if(!person.isModified('password')) return next();

    try{
        //hash the password
        const salt = await  bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(this.password,salt);
        
        this.password = hashedPassword;
        next();
    }catch(err){
        throw next(err);
    }
})

//compare password

personSchema.methods.comparePassword =async (candidatePassword)=>{
    try{
        const isMatch = await bcrypt.compare(candidatePassword,this.password);
        return isMatch;
    }catch(err){
        throw err;
    }

}

module.exports = mongoose.model('hotel_employ',personSchema);