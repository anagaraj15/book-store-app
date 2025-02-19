const express = require('express');
const router = express.Router();

const Cart = require('../models/cartModel');

router.get("/",async(req,res)=> {
    try {
        const cart = await Cart.find({});
        return res.json({message:"Added items in Cart",cart:cart});
    } catch(error){
        console.log(error);
        return res.json({message:'Error'});
    }
});

router.post("/",async(req,res)=> {
    try {
        const cart = await Cart.create(req.body);
        return res.json({message:"Item added to Cart",cart:cart});
    }catch(error) {
        console.log(error);
        return res.json({message:'Error'});
    }
});

module.exports = router;