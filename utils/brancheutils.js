const mongoose=require('mongoose');
const branchData=require('../models/branch-module.js')
const storeData=require('../models/store-module.js')

class BranchOperations{

    async addBranch(storeId,data) {
        
        try {
            const store = await storeData.findOne({ _id: storeId }).populate('branches');
            if (!store) {
                throw new Error('Invalid store Id');
            }

            const branch = await branchData.create(data);
            if (!branch) {
                throw new Error('Failed to create branch');
            }
    
            store.branches.push(branch._id);
            await store.save();
    
            return branch;
        } catch (err) {
            throw new Error(`Error while adding branch: ${err.message}`);
        }
    }

    async deleteBranch(id) {
        try {
            const branch = await branchData.findOneAndDelete({ _id: id });
            
            if (!branch) {
                throw new Error(`Branch not found`);
            }
            
            return branch;
        } catch (err) {
            throw new Error(`Error while deleting branch: ${err.message}`);
        }
    }

    async updateBranch(id,data){
        try{
            const branch= await branchData.findById(id)
            if(!branch){
                throw new Error('Branch Not Found')
            }
            Object.assign(branch,data)

            await branch.save()

            return branch

        }
        catch(err){
            throw new Error(`Error while updating branch: ${err.message}`);
        }
    }
     

    async getBranch(id){
        try {
            const branch = await branchData.findById(id);
            
            if (!branch) {
                throw new Error(`Branch not found`);
            }

            return branch;
        } catch (err) {
            throw new Error(`Error while deleting branch: ${err.message}`);
        }
    }


    async getAllBranches(storeId){

        try {
            const store = await storeData.findOne({_id:storeId}).populate('branches');
            
            if (!store) {
                throw new Error(`Store not found`);
            }

            return store.branches;
        } catch (err) {
            throw new Error(`Error while getting all branches: ${err.message}`);
        }
    }

    async uniqueBranch(storeId,branchName){
        console.log(storeId,branchName)
        try {
            const store = await storeData.findOne({ _id: storeId }).populate('branches');
            console.log(store,'store')
           
            const branch=store.branches.find((branch)=>branch.name==branchName)

            console.log(branch,'branch')

            if(branch){
                return true
            }

            return false

        } catch (err) {
            throw new Error(`Error while adding branch: ${err.message}`);
        }
    }

    async deleteBranch(storeId,branchId){
        try{
            const deletedBranch= await branchData.findOneAndDelete({_id:branchId})

            const store = await storeData.findOne({ branches: branchId });

            if (store) {
                store.branches.pull(storeId);
                await store.save();
            }

            return deletedBranch
        
        } catch (err) {
            throw new Error(`Error while delteing branch: ${err.message}`);
        }
    }

}

module.exports=BranchOperations