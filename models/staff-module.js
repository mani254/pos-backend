const mongoose=require('mongoose')

const staffSchema= new mongoose.Schema({
    createdAt:{
        type:Date,
        default:Date.now,
        immutable:true,
        get: function (createdAt) {
            return createdAt.toLocaleDateString("en-GB"); // Adjust the locale as needed
        }
    },
    updatedAt:{
        type:Date,
        default:Date.now,
        get: function (updatedAt) {
            return updatedAt.toLocaleDateString("en-GB"); // Adjust the locale as needed
        }
    },
    type:{
        type: String,
        enum:['admin,superAdmin,general'],
        required:true
    },
    staffId:{
        type:Number,
        required:true
    },
    sittings:[{
        type: mongoose.Schema.Types.ObjectId,
        ref:'orders'
    }]
})

const staffData= mongoose.model('Staff',staffSchema,"staff")

module.exports=staffData