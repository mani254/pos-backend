const express=require('express');
const {login,main}=require('../controllers/authentication.js')

const router=express.Router()


router.post('/login',login)
router.post('/main',main)

module.exports=router;