const express = require('express');
const router = express.Router();
const person = require('./../models/person');


router.post('/create',async (req,res)=>{
    try{
        const data = req.body;
        const newperson = new person(data);
        const response = await newperson.save();
        console.log("Data create successfully");
        res.status(200).json(response);
    }catch(err){
        console.log(err);
        res.status(500).json({error:"Inernal server error"});
    }
})

router.get('/read',async (req,res)=>{
    try{
        const data = await person.find();
        console.log("Data Fetched successfully");
        res.status(200).json(data);
    }catch(err){
        console.log(err);
        res.status(500).json({error:"Inernal server error"});
    }
})

router.get('/read/:post',async (req,res)=>{
    try{
        const personPost = req.params.post;
        const data = await person.find({"post":personPost});
        console.log("Data Fetched successfully");
        res.status(200).json(data);
    }catch(err){
        console.log(err);
        res.status(500).json({error:"Inernal server error"});
    }
})

router.put('/update/:id',async (req,res)=>{
    try{
        const data = req.body;
        const personId = req.params.id;
        const response = await person.findByIdAndUpdate(personId,data);
        console.log("Data updated successfully");
        res.status(200).json(response);
    }catch(err){
        console.log(err);
        res.status(500).json({error:"Internal server error"});
    }
})

router.delete('/remove/:id',async (req,res)=>{
    try{
        const personId = req.params.id;
        const response = await person.findByIdAndDelete(personId);
        console.log("Data deleted successfully");
        res.status(200).json(response);
    }catch(err){
        console.log(err);
        res.status(500).json({error:"Internal server error"});
    }
})
module.exports = router;