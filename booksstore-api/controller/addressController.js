const Address = require('../models/addressModel');

const CreateAddress = async(req,res)=> {
    try {
        const address = await Address.create(req.body);
        return res.json({message:"Address Created",address:address});
    } catch(error) {
        console.log(error);
        return res.json({message:'Error'});
    }
}

const GetAddressList = async(req,res)=> {
    try {
        const addresses = await Address.find({});
        return res.json({message:"List of Addresses",addresses:addresses});
    } catch(error) {
        console.log(error);
        return res.json({message:'Error'});
    }
}

const GetDefaultAddress = async(req,res)=> {
    try {
        const address = await Address.findOne({default_addr:1});
        return res.json({message:"Default Address ID",address:address});
    } catch(error) {
        console.log(error);
        return res.json({message:"Error"});
    }
}

const GetAddress = async(req,res)=> {
    try {
        const address = await Address.findById(req.params.AddrId);
        return res.json({message:"Address Details",address:address});
    } catch(error) {
        console.log(error);
        return res.json({message:'Error'});
    }
}

const UpdateDefaultAddress = async(req,res)=> {
    try {
        const address = await Address.updateOne({default_addr:1},req.body,{new:true});
        return res.json({message:"Default Address Removed",address:address});
    } catch(error) {
        console.log(error);
        return res.json({message:'Error'});
    }
}

const UpdateAddress = async(req,res)=> {
    try {
        const address = await Address.findByIdAndUpdate(req.params.AddrId,req.body,{new:true});
        return res.json({message:"Address Updated",address:address});
    } catch(error) {
        console.log(error);
        return res.json({message:'Error'});
    }
}

const DeleteAddress = async(req,res)=> {
    //console.log(req.params.AddrId);
    try {
        const address = await Address.findByIdAndDelete(req.params.AddrId);
        return res.json({message:"Address Deleted",address:address});
    } catch(error) {
        console.log(error);
        return res.json({message:'Error'});
    }
}

module.exports = {
    CreateAddress,
    GetAddressList,
    GetAddress,
    GetDefaultAddress,
    UpdateAddress,
    UpdateDefaultAddress,
    DeleteAddress
};