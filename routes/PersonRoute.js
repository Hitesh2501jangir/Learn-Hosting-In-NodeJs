const express = require('express');
const router = express.Router();
const personSchema = require('../models/personSignup');
const {jsonAuthMiddleware,generateToken} = require('./../jwtAuth');


router.post('/singup',async (req,res)=>{
    try{
        const data = req.body;
        const newPerson = new personSchema(data);
        const response = await newPerson.save();
        const token = generateToken(response.email);
        console.log("Your JWT token : " + token);
        console.log("Data Saved SuccessFully");
        res.status(200).json({response,token});
    }catch(err){
        console.log(err);
        res.status(500).json({error:"Internel server error"});
    }
})

router.post('/login',async (req,res)=>{
    try{
        const {username, password} = req.body;
        const user = await personSchema.findOne({username:username});
        if(!user || !(await user.comparePassword(password))){
            return res.json({error:"Invalid user or Password"})
        }

        const payload = {
            id:user.id,
            email:user.email,
        }

        const token =  generateToken(payload);
        res.status(200).json({token});

    }catch(err){
        console.error(err);
        res.status(500).json({error:"Internal server error"});
    }
})

router.get('/read',jsonAuthMiddleware ,async (req,res)=>{
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