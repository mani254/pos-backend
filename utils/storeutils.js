// StoreOperations.js
const mongoose = require("mongoose");
const storesData = require("../models/store-module.js");

class StoreOperations {
	async addStore(data) {
		try {
			await storesData.create(data);
		} catch (err) {
			throw new Error(`Failed to add store: ${err.message}`); // Propagate error to the caller
		}
	}

	async deleteStore(id) {
		try {
			await storesData.findByIdAndDelete(id);
		} catch (err) {
			throw new Error(`Failed to delete store: ${err.message}`); // Propagate error to the caller
		}
	}
}

module.exports = StoreOperations;

