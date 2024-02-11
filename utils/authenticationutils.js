const mongoose=require('mongoose');

const storesData =require('../models/store-module.js');
const branchesData=require('../models/branch-module.js');

class AuthOperations{

    async findUser(credentials){

        try{
            const {username,password}=credentials

            const userInStore= await storesData.findOne({'admin.username':username,'admin.password':password})

            if (userInStore){
                let  response={username,password,storeId:userInStore._id,superAdmin:true}
                return response
            }

            const userInBranch = await branchesData.findOne({'admin.username': username, 'admin.password': password }).populate('store')

            if (userInBranch){
                let response={username,password,storeId:userInBranch.store._id,superAdmin:false,branchName:userInBranch._id}
                return response
            }

            else{
                throw new Error('user not found')
            }
        }
        catch(err){
            throw new Error(`Error while finding User:  ${err.message}`)

        }

    }


}

module.exports=AuthOperations