const branchesData = require('../models/branch-module.js');
const BranchOperations = require('../utils/brancheutils.js');
require('dotenv').config();

const addBranch = async (req, res) => {
    try {
        const branch = new BranchOperations();
        const branchData = req.body;

        const isUnique = await branch.isUnique(req.storeId, req.body.name,req.body.admin.email);
        // console.log('unique branch', unique);
        if(isUnique){
            const data = await branch.addBranch(req.storeId, branchData);
            res.status(200).json({ type: 'success', message: 'branch added successfully', branch: data });
        }


    } catch (err) {
        console.log(err.message);
        if(err.message.includes('Branch Name already exist')){
            return res.status(409).json({type:'warning',message:"Branch Name already Exists"})
        }
        
        if(err.message.includes('Admin Email Already exist')){
            return res.status(409).json({type:'warning',message:"Branch Email already Exists"})
        }
        res.status(500).json({ type: 'error', message: 'Internal server error' });
    }
};


const getBranchesByStoreId = async (req, res) => {
    try {
        const branch = new BranchOperations();
        const data = await branch.getBranchesByStoreId(req.storeId);

        res.status(200).json({ type: 'success', message: '', branches: data });
    } catch (err) {
        console.log(err.message);
        res.status(500).json({ type: 'error', message: err.message });
    }
};

const getBranchById = async (req, res) => {
    try {
        const branch = new BranchOperations();
        const data = await branch.getBranchById(req.body.id);

        res.status(200).json({ type: 'success', message: '', branch: data });

    } catch (err) {
        console.log(err.message);
        res.status(500).json({ type: 'error', message: err.message });
    }
};

const updateBranch = async (req, res) => {
    try {
        const branch = new BranchOperations();

        const isUnique = await branch.isUnique(req.storeId, req.body.name,req.body.admin.email,req.body._id);
        // console.log('unique branch', unique);
        if(isUnique){
            const data = await branch.updateBranch(req.body._id, {
                admin: req.body.admin,
                address: req.body.address,
                status: req.body.status,
                name: req.body.name
            });
            
            res.status(200).json({ type: 'success', message: 'Branch updated successfully', branch: data });
        }

    } catch (err) {
        console.log(err.message);

        if(err.message.includes('Branch Name already exist')){
            return res.status(409).json({type:'warning',message:"Branch Name already Exists"})
        }
        
        if(err.message.includes('Admin Email Already exist')){
            return res.status(409).json({type:'warning',message:"Branch Email already Exists"})
        }
        
        res.status(500).json({ type: 'error', message: err.message });
    }
};

const deleteBranch = async (req, res) => {
	try{
		const branch=new BranchOperations
		const deletedBranch=await branch.deleteBranch(req.storeId,req.body.branchId)
		res.status(200).json({ type: 'success', message: 'Branch Deleted successfully', branch: deletedBranch });
	}catch (err) {
        console.log(err.message);
        res.status(500).json({ type: 'error', message: err.message });
	}
};

const getBranchNamesBystoreId= async (req,res)=>{
    try {
        const branch = new BranchOperations();
        let  data = await branch.getBranchesByStoreId(req.storeId);

        data= data.map(branch=> ({id:branch._id,branchName:branch.name}));

        res.status(200).json({ type: 'success', message: '', branches: data });
    } catch (err) {
        console.log(err.message);
        res.status(500).json({ type: 'error', message: err.message });
    }
}


    // const bulkUpload = async (req, res) => {
    //     try {
    //         const branch = new BranchOperations();
    //         const branchArray = req.body;
        
    //         console.log(branchArray, 'request Array');
        
    //         // Map each branchData to a promise that performs the necessary operations
    //         const operations = branchArray.map(async (branchData) => {
    //             console.log(branchData);
        
    //             const unique = await branch.uniqueBranch(req.storeId, branchData.name);
    //             console.log('unique branch', unique);
    //             if (unique) {
    //                 return { type: 'warning', message: 'branch already existed' };
    //             }
        
    //             const data = await branch.addBranch(req.storeId, branchData);
    //             return data; // Assuming data contains some relevant information about the added branch
    //         });
        
    //         // Wait for all promises to resolve
    //         const results = await Promise.all(operations);
        
    //         const warning = results.find(result => result && result.type === 'warning');
    //         if (warning) {
    //             return res.status(201).json(warning); 
    //         }
        
    //         res.status(200).json({ type: 'success', message: 'branches added successfully' });
        
    //     } catch (err) {
    //         console.log(err.message);
    //         res.status(500).json({ type: 'error', message: 'Internal server error' });
    //     }
        
    // };











module.exports = { addBranch, getBranchesByStoreId, updateBranch, getBranchById,deleteBranch,getBranchNamesBystoreId};
