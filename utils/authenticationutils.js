const mongoose=require('mongoose');

const storesData =require('../models/store-module.js');
const branchesData=require('../models/branch-module.js');

class AuthOperations{

    async findUser(credentials){

        try{
            const {username,password}=credentials

            const userInStore= await storesData.findOne({'admin.username':username,'admin.password':password})

            if (userInStore){
                let  response={username,password,store:userInStore.name,superAdmin:true}
                return response
            }

            const userInBranch = await branchesData.findOne({'admin.username': username, 'admin.password': password }).populate('store')

            if (userInBranch){
                let response={username,password,store:userInBranch.store.name,superAdmin:false,branch:userInBranch.name}
                return response
            }

            else{
                console.log('else in finduser')
                throw new Error('user not found')
            }
        }
        catch(err){
            console.log('catch in error-message finduser')
            throw new Error(`Error while finding User:  ${err.message}`)

        }

    }

}

module.exports=AuthOperations