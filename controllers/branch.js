const branchesData = require('../models/branch-module.js');
const BranchOperations = require('../utils/brancheutils.js');
require('dotenv').config();

const addBranch = async (req, res) => {
    try {
        const branch = new BranchOperations();
        const branchData = req.body;

        const unique = await branch.uniqueBranch(req.storeId, req.body.name);
        console.log('unique branch', unique);
        if (unique) {
            return res.status(201).json({ type: 'warning', message: 'branch already existed' });
        }

        const data = await branch.addBranch(req.storeId, branchData);
        res.status(200).json({ type: 'success', message: 'branch added successfully', branch: data });
    } catch (err) {
        console.log(err.message);
        res.status(500).json({ type: 'error', message: 'Internal server error' });
    }
};

const getBranches = async (req, res) => {
    try {
        const branch = new BranchOperations();
        const data = await branch.getAllBranches(req.storeId);
        res.status(200).json({ type: 'success', message: '', branches: data });
    } catch (err) {
        console.log(err.message);
        res.status(500).json({ type: 'error', message: err.message });
    }
};

const getBranch = async (req, res) => {
    try {
        const branch = new BranchOperations();
        const data = await branch.getBranch(req.body.id);
        res.status(200).json({ type: 'success', message: '', branch: data });
    } catch (err) {
        console.log(err.message);
        res.status(500).json({ type: 'error', message: err.message });
    }
};

const updateBranch = async (req, res) => {
    try {
        const branch = new BranchOperations();

		const unique = await branch.uniqueBranch(req.storeId, req.body.name);
        console.log('unique branch', unique);
        if (unique) {
            return res.status(201).json({ type: 'warning', message: 'branch already existed' });
        }

        const data = await branch.updateBranch(req.body._id, {
            id: req.body._id,
            admin: req.body.admin,
            address: req.body.address,
            status: req.body.status,
            name: req.body.name
        });
        console.log('data returned by the utility function', data);
        res.status(200).json({ type: 'success', message: 'Branch updated successfully', branch: data });
    } catch (err) {
        console.log(err.message);
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

module.exports = { addBranch, getBranches, updateBranch, getBranch,deleteBranch};
