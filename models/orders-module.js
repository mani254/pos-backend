const mongoose=require('mongoose')

const orderSchema=new mongoose.Schema({
    createdAt:{
        type:Date,
        default:Date.now,
        immutable:true
    },
    updatedAt:{
        type:Date,
        default:Date.now,
    },
    customerName:{
        type:String,
        required:true,
        set: function (customerName){
            return customerName.toLowerCase()
        }
    },
    customerEmail:{
        type:String,
        match: /^\S+@\S+\.\S+$/,
    },
    customerNumber:{
        type:Number,
        minlength:10,
        maxlength:10
       
    },
    transactionType:{
        type:String,
        enum:['cash','card','UPI'],
        required:true
    },
    discount:{
        type:Number,
        default:0,
    },
    noOfProducts:{
        type:Number,
        required:true
    },
    products:[{
        name:{
            type:String,
            required:true,
            set: function (name){
                return name.toLowerCase()
            }
        },
        size:{
            type:String,
            required:true,
        },
        cp:{
            type:Number,
            required:true
        },
        sp:{
            type:Number,
            required:true
        },
        mrp:{
            type:Number,
            required:true
        }
    }],
    totalAmount: {
        type:Number,
        required:true
    },
    sittingBy:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Staff'
    }

})

const ordersData=mongoose.model('Orders',orderSchema,'orders')