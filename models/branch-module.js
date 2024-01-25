const mongoose=require('mongoose');

const branchSchema= new mongoose.Schema({
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
        set: function (name){
            return name.toLowerCase()
        },
        required:true,
        unique:true,
        minlength: 2, 
        maxlength: 30 
    },
    location:{
        type:String,
        set: function (location){
            return location.toLowerCase()
        },
        required:true,
        minlength: 2, 
        maxlength: 50
    },
    address:{
        type:String,
        set: function (address){
            return address.toLowerCase()
        },
        required:true,
        minlength: 5, 
        maxlength: 100,
    },
    status:{
        type:Boolean,
        default:true
    },
    staff: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'staff'
    }]

})

const branchesData= mongoose.model('Branch',branchSchema,'branches')

module.exports= branchesData