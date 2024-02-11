const jwt=require('jsonwebtoken')


const adminAuthorization=async(req,res,next)=>{
    try{
        const decoded=jwt.decode(req.cookies.token,process.env.JWT_SECRET_KEY)
        const {storeId,superAdmin,branchId}=decoded

        if (superAdmin){
            req.storeId=storeId
            return next()
        }

        else if(branchId){
            req.storeId=storeId,
            req.branchId=branchId
            return next()
        }

        res.status(401).json({type:'error',message:'Not authorized in else'})

    }
    catch(err){
        console.log(err.message)
        res.status(401).json({type:'error',message: 'Not authorized in catch' });
    }
}


module.exports={adminAuthorization}