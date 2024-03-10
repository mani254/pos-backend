const StaffOperations = require("../utils/staffutils");

const getStoreStaff = async (req, res) => {
	try {
		const staff = new StaffOperations();
		const storeStaff = await staff.getStaffByStoreId(req.storeId);

		return res.status(200).json({ type: "success", message: "staffDetails", storeStaff });
	} catch (err) {
		if (err.message.includes("Staff is Emphty")) {
			return res.status(204).json({ type: "success", message: "Staff is Emphty" });
		}
		console.log(err.message);
		res.status(500).json({ type: "error", message: "Internal server error" });
	}
};

const addStaff = async (req, res) => {
	try {
		const { name, phoneNo, email, staffId, status, branchId } = req.body;
		const staff = new StaffOperations();
		const addStaff = await staff.addStaff(req.body.branchId, { name, phoneNo, email, staffId, status, branch: branchId });

		if (addStaff) {
			return res.status(200).json({ type: "success", message: "store added succesfully" });
		}
	} catch (err) {
		if (err.message.includes("Email is already in use")) {
			return res.status(409).json({ type: "warning", message: "Email already exist" });
		}
		if (err.message.includes("Phone number is already in use")) {
			return res.status(409).json({ type: "warning", message: "Phone number already exist" });
		}
		if (err.message.includes("Staff ID is already in use")) {
			return res.status(409).json({ type: "warning", message: "StaffId is already exist" });
		}
		console.log(err.message);
		res.status(500).json({ type: "error", message: "Internal server error" });
	}
};
const updateStaff = async (req, res) => {
	try {
		const { name, phoneNo, email, staffId, status, branch } = req.body;
		const staff = new StaffOperations();
		const updateStaff = await staff.updateStaff(req.body.branchId, req.body._id, { name, phoneNo, email, staffId, status, branch });

		if (updateStaff) {
			return res.status(200).json({ type: "success", message: "store updated succesfully" });
		}
	} catch (err) {
		if (err.message.includes("Email is already in use")) {
			return res.status(409).json({ type: "warning", message: "Email already exist" });
		}
		if (err.message.includes("Phone number is already in use")) {
			return res.status(409).json({ type: "warning", message: "Phone number already exist" });
		}
		if (err.message.includes("Staff ID is already in use")) {
			return res.status(409).json({ type: "warning", message: "StaffId is already exist" });
		}
		res.status(500).json({ type: "error", message: "Internal server error" });
	}
};
const deleteStaff = async (req, res) => {
	try {
		const staff = new StaffOperations();
		const delStaff = await staff.deleteStaff(req.body.branchId, req.body.staffId);

		if (delStaff) {
			return res.status(200).json({ type: "success", message: "staff deleted succesfully" });
		}
	} catch (err) {
		console.log(err.message);
		res.status(500).json({ type: "error", message: "Internal server error" });
	}
};
const getStaff = async (req, res) => {
	try {
	} catch (err) {
		console.log(err.message);
		res.status(500).json({ type: "error", message: "Internal server error" });
	}
};

const getStaffById = async (req, res) => {
	try {
		const { id } = req.body;
		const staff = new StaffOperations();
		const singleStaff = await staff.getStaffById(id);
		return res.status(200).json({ type: "success", message: "fetched Staff", singleStaff });
	} catch (err) {
		console.log(err.message);
		res.status(500).json({ type: "error", message: "Internal server error" });
	}
};

const getBranchStaff = async (req, res) => {
	try {
	} catch (err) {
		console.log(err.message);
		res.status(500).json({ type: "error", message: "Internal server error" });
	}
};

module.exports = { addStaff, updateStaff, deleteStaff, getBranchStaff, getStaff, getStoreStaff, getStaffById };
