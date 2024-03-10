const express=require('express');

const router=express.Router()

const {addBranch,getBranchesByStoreId,updateBranch,getBranchById,deleteBranch,getBranchNamesBystoreId,bulkUpload} =require('../controllers/branch.js')
const {adminAuthorization}=require('../middleware/authorization.js')


router.post('/addbranch',adminAuthorization,addBranch)
router.post('/getbranches',adminAuthorization,getBranchesByStoreId)
router.post('/updateBranch',adminAuthorization,updateBranch)
router.post('/getBranch',adminAuthorization,getBranchById)
router.post('/deleteBranch',adminAuthorization,deleteBranch)
router.post('/getBranchNames',adminAuthorization,getBranchNamesBystoreId)
// router.post('/bulkUpload',adminAuthorization,bulkUpload)



module.exports=router;