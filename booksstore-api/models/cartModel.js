const mongoose = require('mongoose');
const cartSchema = mongoose.Schema({
    idval : {
        type:String,
    },
    username : {
        type:String,
    },
    bookname : {
        type:String,
    },
    price : {
        type:Number,
    }
});

module.exports = mongoose.model("Cart",cartSchema);