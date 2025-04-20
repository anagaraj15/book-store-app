const mongoose = require('mongoose');
const addressSchema = mongoose.Schema({
    firstname: {
        type:String,
        required:[true,'First Name is required']
    },
    lastname: {
        type:String,
        required:[true,'Last Name is required']
    },
    mobileno: {
        type:String,
        required:[true,'Mobile Number is required']
    },
    houseno: {
        type:String,
        required:[true,'House Number is Required']
    },
    areaname: {
        type:String,
        required:[true,'Area Name is Required']
    },
    landmark: {
        type:String,
        required:[true,'Landmark is Required']
    },
    city: {
        type:String,
        required:[true,'City is Required']
    },
    state: {
        type:String,
        required:[true,'State is Reuired']
    },
    pincode: {
        type:String,
        required:[true,'Pincode is Required']
    },
    default_addr: {
        type:Number,
        default:0
    }

},
{
    timestamps:true,
});


module.exports = mongoose.model('Address',addressSchema);