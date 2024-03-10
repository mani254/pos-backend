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
    name:{
        type:String,
        required:true
    },
    phoneNo:{
        type:Number,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    status:{
        type:Boolean,
        default:true,
    },
    staffId:{
        type:Number,
        required:true
    },
    sittings:[{
        type: mongoose.Schema.Types.ObjectId,
        ref:'orders'
    }],
    branch:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'branches'
    }
})

const staffData= mongoose.model('staff',staffSchema,"staff")

module.exports=staffData