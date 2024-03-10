const branchData = require("../models/branch-module.js");
const staffData = require("../models/staff-module.js");
const storeData = require("../models/store-module.js");

class StaffOperations {
	async getStaffByStoreId(id) {
		try {
			let storeStaff = [];
			const store = await storeData.findById(id).populate("branches");
			if (!store) {
				throw new Error("Store not Found");
			}
			const staff = await staffData.find({});
			if (staff.length < 1) {
				throw new Error("Staff is Empty");
			}
			store.branches.forEach((singleBranch) => {
				let branchStaff = staff.filter((singleStaff) => singleStaff.branch.toString() === singleBranch.id.toString());
				storeStaff = [...storeStaff, ...branchStaff];
			});
			return storeStaff;
		} catch (err) {
			throw new Error(`Error while fetching staff: ${err.message}`);
		}
	}
	async addStaff(branchId, data) {
		try {
			const branch = await branchData.findById(branchId);

			if (!branch) {
				throw new Error("Invalid branch Id");
			}

			const branchStaff = await staffData.find({ branch: branchId });

			console.log(branchStaff);

			const existingStaffWithEmail = branchStaff.find((staff) => staff.email == data.email);
			if (existingStaffWithEmail) {
				throw new Error("Email is already in use within the branch");
			}

			const existingStaffWithPhoneNo = branchStaff.find((staff) => staff.phoneNo == data.phoneNo);
			if (existingStaffWithPhoneNo) {
				throw new Error("Phone number is already in use within the branch");
			}

			const existingStaffWithStaffId = branchStaff.find((staff) => staff.staffId == data.staffId);
			if (existingStaffWithStaffId) {
				throw new Error("Staff ID is already in use within the branch");
			}

			const newStaff = await staffData.create(data);
			if (!newStaff) {
				throw new Error("Failed to create staff");
			}

			branch.staff.push(newStaff._id);
			await branch.save();

			return newStaff;
		} catch (err) {
			console.error(err.message);
			throw new Error(`Error while adding staff: ${err.message}`);
		}
	}

	async updateStaff(branchId, staffId, data) {
		try {
			const staff = await staffData.findById(staffId);

			console.log(branchId, staff.branch, staffId, data);

			let branchStaff = [];

			if (staff.branch.toString() === branchId) {
				branchStaff = await branchData.findById(staff.branch).populate("staff");
			} else {
				branchStaff = await branchData.findById(branchId).populate("staff");
			}

			// console.log(branchStaff, '--------------branchStaff---------------');

			const existingStaffWithEmail = branchStaff.staff.find((staff) => staff.email == data.email);
			if (existingStaffWithEmail && staffId != existingStaffWithEmail._id) {
				throw new Error("Email is already in use within the branch");
			}

			const existingStaffWithPhoneNo = branchStaff.staff.find((staff) => staff.phoneNo == data.phoneNo);
			if (existingStaffWithPhoneNo && staffId != existingStaffWithPhoneNo._id) {
				throw new Error("Phone number is already in use within the branch");
			}

			const existingStaffWithStaffId = branchStaff.staff.find((staff) => staff.staffId == data.staffId);
			if (existingStaffWithStaffId && staffId != existingStaffWithStaffId._id) {
				throw new Error("Staff ID is already in use within the branch");
			}

			console.log(branchStaff);

			if (staff.branch.toString() === branchId) {
				Object.assign(staff, data);
				staff.save();
				return data;
			} else {
				const preBranch = await branchData.findById(staff.branch);
				preBranch.staff.pop(staffId);

				const newBranch = await branchData.findById(branchId);
				newBranch.staff.push(staffId);

				data.branch = branchId;
				Object.assign(staff, data);
				// console.log(data, "data");
				await staff.save();
				await preBranch.save();
				await newBranch.save();
				return data;
			}
		} catch (err) {
			console.log(err.message);
			throw new Error(`Error while updating staff: ${err.message}`);
		}
	}

	async getStaffById(id) {
		const staff = await staffData.findById(id);
		if (!staff) {
			throw new Error("Invalid Staff Id");
		}
		return staff;
	}

	// async addStaff(branchId,data){

	//     try{
	//     const branch= await branchData.findById(branchId)

	//     if (!branch) {
	//         throw new Error('Invalid branch Id');
	//     }
	//     const newStaff= await staffData.create(data)

	//     if (!newStaff) {
	//         throw new Error('Failed to create branch');
	//     }

	//     branch.staff.push(newStaff._id)
	//     await branch.save()
	//     return newStaff

	//     }
	//     catch(err){
	//         console.log(err.message)
	//         throw new Error(`Error while adding staff: ${err.message}`);
	//     }

	// }

	async deleteStaff(branchId, staffId) {
		try {
			const branch = await branchData.findById(branchId);

			if (!branch) {
				throw new Error("Branch not found");
			}

			const deletedStaff = await staffData.findOneAndDelete({ _id: staffId });

			if (!deletedStaff) {
				throw new Error("Staff not deleted");
			}

			branch.staff.pull(staffId);

			await branch.save();

			return deletedStaff;
		} catch (err) {
			console.error(err.message);
			throw new Error(`Error while deleting staff: ${err.message}`);
		}
	}

	async getBranchStaff(branchId) {
		try {
			const branch = await branchData.findById(branchId).populate("staff");

			if (!branch) throw new Error("branch not found");

			staff = branch.staff;

			return staff;
		} catch (err) {
			console.log(err.message);
			throw new Error(`Error while getting staff: ${err.message}`);
		}
	}

	async getStaff(staffId) {
		try {
			const staff = await staffData.findOneById(staffId);

			if (!staff) throw new Error("staff is not found");

			return staff;
		} catch (err) {
			console.log(err.message);
			throw new Error(`Error while getting single staff: ${err.message}`);
		}
	}
}

module.exports = StaffOperations;
