const express = require("express");

const mongoose = require("mongoose");
const User = require('../models/userModel'); 
const router = express.Router();



//adding users data
router.post("/",async(req,res)=>{
    //var name = req.body.name
    const{name,email,age} = req.body;
    const User=require("../models/userModel");
    try{
        const addData = await User.create({
            name:name,
            email:email,
            age:age,
        });
        res.status(201).json(addData);

    }
    catch(error){
        console.log(error); 
        res.status(400).json({erro:error.massege});

    }
    
});

//getting all user
router.get("/",async(req,res)=>{
    try{
    const showall = await User.find();
    res.status(200).json(showall);

    }
    catch(error){
        console.log(error); 
        res.status(500).json({erro:error.massege});

    }
   
});

//getting single user info
router.get("/:id",async(req,res)=>{
    const {id} = req.params;  //getting id by url
    try{
    const singleuser = await User.findById({_id : id});
    res.status(200).json(singleuser);

    }
    catch(error){
        console.log(error); 
        res.status(500).json({erro:error.massege});

    }
   
});

//delete
router.delete("/:id",async(req,res)=>{
    const {id} = req.params;  //getting id by url
    try{
    const deleteuser = await User.findByIdAndDelete({_id : id});
    res.status(200).json(deleteuser);

    } 
    catch(error){
        console.log(error); 
        res.status(500).json({erro:error.massege});

    }
   
});
//update info/patch
router.patch("/:id",async(req,res)=>{
    const {id} = req.params;  //getting id by url
    const {name,email,age} = req.body;
    try{
    const updateuser = await User.findByIdAndUpdate(id,req.body,{
        new :true,
    });
    res.status(200).json(updateuser);

    } 
    catch(error){
        console.log(error); 
        res.status(500).json({erro:error.massege});

    }
   
});
module.exports = router;
