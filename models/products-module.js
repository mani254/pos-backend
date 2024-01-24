
const mongoose=require('mongoose');

const productSchema=mongoose.Schema({
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
    sizes:[{
        count:{
            type:Number,
            required:true,
        },
        size:{
            type:String,
            required:true,
        },
        sp:{
            type:Number,
            required:true
        },
        cp:{
            type:Number,
            required:true
        },
        mrp:{
            type:Number,
            required:true
        }

    }],
    sellerName:{
        type:String,
        required:true,
        set: function (sellerName){
            return sellerName.toLowerCase()
        }
        
    },
    sellerShorcut:{
        type:String,
        required:true,
        set: function (sellerShortCut){
            return sellerShortCut.toLowerCase()
        }
    },
    sellerPlace:{
        type:String,
        required:true,
        set: function (sellerPlace){
            return sellerPlace.toLowerCase()
        }
    }
})

const productsData=mongoose.model('Products',productSchema,'products')