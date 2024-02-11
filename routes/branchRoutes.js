const express=require('express');

const router=express.Router()

const {addBranch,getBranches,updateBranch,getBranch,deleteBranch} =require('../controllers/branch.js')
const {adminAuthorization}=require('../middleware/authorization.js')


router.post('/addbranch',adminAuthorization,addBranch)
router.post('/getbranches',adminAuthorization,getBranches)
router.post('/updateBranch',adminAuthorization,updateBranch)
router.post('/getBranch',adminAuthorization,getBranch)
router.post('/deleteBranch',adminAuthorization,deleteBranch)


module.exports=router;