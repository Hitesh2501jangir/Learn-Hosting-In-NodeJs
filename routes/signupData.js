const express = require('express');
const router = express.Router();
const personSchema = require('./../models/personSignup');

router.post('/singup',async (req,res)=>{
    try{
        const data = req.body;
        const newPerson = new personSchema(data);
        const response = await newPerson.save();
        console.log("Data Saved SuccessFully");
        res.status(200).json(response);
    }catch(err){
        console.log(err);
        res.status(500).json({error:"Internel server error"});
    }
})

router.get('/read',async (req,res)=>{
    try{
        const response = await personSchema.find();
        console.log("Data fetched successfully");
        res.status(200).json(response);
    }catch(err){
        console.log(err);
        res.status(500).json({error:"Internel server error"});
    }
})

router.put('/update/:email',async (req,res)=>{
    try{
        const prequestEmail = req.params.email;
        const personName = req.body.username;
        const personpassword = req.body.password;
        const response = await personSchema.findOneAndUpdate({"email":prequestEmail},{"username":personName,"password":personpassword});
        console.log("Data update successfully");
        res.status(200).json(response);
    }catch(err){
        console.log(err);
        res.status(500).json({error:"Internel server error"});
    }
})

router.delete('/remove/:email',async (req,res)=>{
    try{
        const requestEmail = req.params.email;
        const response = await personSchema.findOneAndDelete({"email":requestEmail});
        console.log("Data Removed Successfully");
        res.status(200).json(response);
    }catch(err){
        console.log(err);
        res.status(500).json({error:"Internel server error"});
    }
})

module.exports = router;