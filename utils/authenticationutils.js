const mongoose=require('mongoose');

const storesData =require('../models/store-module.js');
const branchesData=require('../models/branch-module.js');

class AuthOperations{

    async findUser(credentials){

        try{
            const {email,password}=credentials

            const userInStore= await storesData.findOne({'admin.email':email,'admin.password':password})

            if (userInStore){
                let  response={username:userInStore.admin.username,password,storeId:userInStore._id,superAdmin:true,storeName:userInStore.name}
                return response
            }

            const userInBranch = await branchesData.findOne({'admin.email': email, 'admin.password': password }).populate('store')

            if (userInBranch){
                let response={username:userInBranch.store.admin.username,password,storeId:userInBranch.store._id,storeName:userInBranch.store.name,superAdmin:false,branchName:userInBranch._id}
                return response
            }

            else{
                return {status:401,message:'User not found'}
            }
        }
        catch(err){
            throw new Error(`Error while finding User:  ${err.message}`)

        }

    }


}

module.exports=AuthOperations