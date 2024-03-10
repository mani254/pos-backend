const express=require('express');
const { adminAuthorization } = require('../middleware/authorization');

const {addStaff,updateStaff,deleteStaff, getBranchStaff,getStaff,getStoreStaff,getStaffById} = require('../controllers/staff.js')
const router=express.Router()



router.post('/add',adminAuthorization,addStaff)
router.post('/update',adminAuthorization,updateStaff)
router.post('/delete',adminAuthorization,deleteStaff)
router.post('/getBranchStaff',adminAuthorization, getBranchStaff)
router.post('/getStoreStaff',adminAuthorization,getStoreStaff)
router.post('/getStaffById',adminAuthorization,getStaffById)


module.exports=router;