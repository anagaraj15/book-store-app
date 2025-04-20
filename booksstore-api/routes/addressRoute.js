const express = require('express');
const router = express.Router();
const {
    CreateAddress,
    GetAddressList,
    GetAddress,
    GetDefaultAddress,
    UpdateAddress,
    UpdateDefaultAddress,
    DeleteAddress
} = require('../controller/addressController');

router.post("/",CreateAddress);

router.get("/",GetAddressList);

router.get("/default",GetDefaultAddress);

router.get("/:AddrId",GetAddress);

router.put("/:AddrId",UpdateAddress);

router.put("/",UpdateDefaultAddress);

router.delete("/:AddrId",DeleteAddress);

module.exports = router;