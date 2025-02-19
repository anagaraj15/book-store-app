const mongoose = require('mongoose');
const userSchema = mongoose.Schema({
    firstname : {
        type:String,
    },
    lastname : {
        type:String,
    },
    emailid : {
        type:String,
    },
    mobileno : {
        type:String,
    },
    username : {
        type:String,
    },
    password : {
        type:String,
    }
});

module.exports = mongoose.model("User",userSchema);