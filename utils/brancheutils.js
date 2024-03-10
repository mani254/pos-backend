const mongoose = require('mongoose');
const branchData = require('../models/branch-module.js');
const storeData = require('../models/store-module.js');

class BranchOperations {
    async getBranchById(id) {
        try {
            const branch = await branchData.findById(id);
            
            if (!branch) {
                throw new Error('Branch not found');
            }

            return branch;
        } catch (err) {
            console.log(err.message, "util");
            throw new Error('Error while getting branch by ID');
        }
    }

    async getBranchesByStoreId(storeId) {
        try {
            const store = await storeData.findOne({_id: storeId}).populate('branches');
            
            if (!store) {
                throw new Error('Store not found');
            }

            return store.branches;
        } catch (err) {
            console.log(err.message, "util");
            throw new Error('Error while getting branches by Store ID');
        }
    }

    async getAllBranches() {
        try {
            const branches = await branchData.find({});

            if (!branches || branches.length === 0) {
                throw new Error('No Branches Found');
            }

            return branches;
        } catch (err) {
            console.log(err.message, "util");
            throw new Error('Error while getting all branches');
        }
    }

    async addBranch(storeId, data) {
        try {
            const store = await storeData.findOne({ _id: storeId }).populate('branches');

            if (!store) {
                throw new Error('Invalid Store Id');
            }

            const branch = await branchData.create(data);

            if (!branch) {
                throw new Error('Failed to create branch');
            }
    
            store.branches.push(branch._id);
            await store.save();
    
            return branch;
        } catch (err) {
            console.log(err.message, "util");
            throw new Error('Error while adding branch');
        }
    }

    async updateBranch(id, data) {
        try {
            const branch = await branchData.findById(id);

            if (!branch) {
                throw new Error('Branch not found');
            }

            Object.assign(branch, data);
            await branch.save();

            return branch;
        } catch (err) {
            console.log(err.message, "util");
            throw new Error('Error while updating branch');
        }
    }

    async isUnique(storeId, branchName,userMail,branchId) {
        try {
            console.log(storeId, branchName,userMail,branchId)
            const store = await storeData.findOne({ _id: storeId }).populate('branches');
            const branchWithSameName = store.branches.find(branch => branch.name == branchName);
            const branchWithSameMail= store.branches.find(branch => branch.admin.email == userMail);


            console.log(branchWithSameName,branchWithSameMail,'samename','samemail')
            if(branchWithSameName){
                
                if(branchId && branchId!= branchWithSameName._id){
                    throw new Error('Branch Name already exist')
                }

                if(!branchId){

                    throw new Error('Branch Name already exist')
                }
            }

            if(branchWithSameMail){
                if(branchId && branchId!= branchWithSameMail._id){
                    throw new Error('Branch Email already exist')
                }
                if(!branchId){
                    throw new Error('Admin Email Already exist');
                }
            }

            return true

        } catch (err) {
            throw new Error(`Error while checking uniqueness of branch ${err.message}`);
        }
    }

    async deleteBranch(storeId, branchId) {
        try {
            const deletedBranch = await branchData.findOneAndDelete({_id: storeId});
            const store = await storeData.findOne({ branches: branchId });

            if (store) {
                store.branches.pull(branchId);
                await store.save();
            }

            return deletedBranch;
        } catch (err) {
            console.log(err.message, "util");
            throw new Error('Error while deleting branch');
        }
    }
}

module.exports = BranchOperations;
