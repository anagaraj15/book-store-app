const express = require('express');
const router = express.Router();
const {
    CreateAddress,
    GetAddressList,
    GetAddress,
    UpdateAddress,
    DeleteAddress
} = require('../controller/addressController');

router.post("/",CreateAddress);

router.get("/",GetAddressList);

router.get("/:AddrId",GetAddress);

router.put("/:AddrId",UpdateAddress);

router.delete("/:AddrId",DeleteAddress);

module.exports = router;