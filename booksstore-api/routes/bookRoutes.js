const express = require('express');
const router = express.Router();

const Book = require('../models/bookModel');

router.post("/",async(req,res)=> {
    console.log(req.body);
    try {
        const book = await Book.create(req.body);
        return res.json({book:book});
    }catch(error){
        console.log(error);
        return res.json({message:'Error'});
    }
})

router.get("/",async(req,res) => {
    try {
        const books = await Book.find({});
        return res.json({message:"List of Books",books:books});
    } catch(error){
        console.log(error);
        return res.json({message:'Error'});
    }
});

router.get("/:bookId",async(req,res) => {
    console.log(req.params.bookId);
    try {
        const book = await Book.findById(req.params.bookId);
        return res.json({message:"Book Details",book:book});
    } catch(error){
        console.log(error);
        return res.json({message:'Error'});
    }
});

router.put("/:bookId",async(req,res) => {
    console.log(req.params.bookId);
    try {
        const book = await Book.findByIdAndUpdate(req.params.bookId,req.body,{new:true});
        return res.json({message:"Updating of Book",book:book});
    } catch(error){
        console.log(error);
        return res.json({message:'Error'});
    }
});

router.delete("/:bookId",async(req,res) => {
    console.log(req.params.bookId);
    try {
        const book = await Book.findByIdAndDelete(req.params.bookId);
        return res.json({message:"Deleting of Book",book:book});
    } catch(error){
        console.log(error);
        return res.json({message:'Error'});
    }
});

module.exports = router;