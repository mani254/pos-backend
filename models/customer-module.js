const mongoose = require("mongoose");

const customerSchema = new mongoose.Schema({
	name: {
		type: String,
		required:true
	},
	phoneNumber: {
		type: Number,
		unique: true,
		minlength:10,
		maxlength:10
	},
	mail: {
		type: String,
		match: /^\S+@\S+\.\S+$/,
	},
	orders: [{ type: mongoose.Schema.Types.ObjectId, ref: "orders" }]
});

const customerData=mongoose.model("Customer",customerSchema,'customers')