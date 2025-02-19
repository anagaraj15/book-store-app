const express = require('express');
const router = express.Router();

const User = require('../models/userModel');

router.get("/",async(req,res)=> {
    //console.log(req);
    try {
        const users = await User.find({});
        return res.json({message:"List of Users",users:users});
    } catch(error) {
        console.log(error);
        return res.json({message:'Error'});
    }
});

router.get("/:userId",async(req,res)=> {
    //console.log(req.params.userId);
    try {
        const userId = req.params.userId;
        const user = await User.findById(userId);
        return res.json({message:"User Details",user:user});
    } catch(error) {
        console.log(error);
        return res.json({message:'Error'});
    }
})

router.post("/",async(req,res)=> {
    //console.log(req.body);
    try {
        const userdetails = req.body;
        const user = await User.create(userdetails);
        return res.json({message:"New User Details",user:user});
    } catch(error) {
        console.log(error);
        return res.json({message:'Error'});
    }
})

router.put("/:userId",async(req,res)=> {
    try {
        const userId = req.params.userId;
        const user = await User.findByIdAndUpdate(userId,req.body,{new:true});
        return res.json({message:"Updating User Details",user:user});
    } catch(error) {
        console.log(error);
        return res.json({message:'Error'});
    }
})

router.delete("/:userId",async(req,res)=> {
    try {
        const userId = req.params.userId;
        const user = await User.findByIdAndDelete(userId);
        return res.json({message:"Deleted User",user:user});
    } catch(error) {
        console.log(error);
        return res.json({message:'Error'});
    }
});

module.exports = router;