const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

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

//create a hashed password

personSchema.pre('save',async function(next){
    const person = this;
    if(!person.isModified('password'))return next();
    try{
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(person.password, salt);
        person.password = hashedPassword;
        next();
    }catch(err){
        return next(err);
    }
})

//compare a hashed password and given password

personSchema.methods.comparePassword = async function(candidatePassword){
    try{
        const isMatch = bcrypt.compare(candidatePassword, this.password);
        return isMatch;
    }catch(err){
        throw err;
    }
}

module.exports = mongoose.model('autnintication',personSchema);