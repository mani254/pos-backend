const mongoose = require("mongoose");

const storeSchema = new mongoose.Schema({
    createdAt:{
        type:Date,
        default:Date.now,
        immutable:true
    },
    updatedAt:{
        type:Date,
        default:Date.now,
    },
    admin:{
        username:{
            type:String,
            required:true,
            unique:true
        },
        password:{
            type:String,
            required:true
        }
    },
	name: {
		type: String,
		required:true,
        unique:true,
        set:function(value){
            return value.toLowerCase()
        }
	},
	branches: [{ type: mongoose.Schema.Types.ObjectId, ref: "branches" }],
});

const storesData=mongoose.model("stores",storeSchema,'stores')

module.exports=storesData