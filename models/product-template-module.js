const mongoose=require('mongoose')

const templateSchema=new mongoose.Schema({
   productTemplate:[{
    type:{
        type:String,
        required:true
    },
    sizes:{
        type:[String],
        required:true
    }
}]
   
})

const templateData = mongoose.model('Product Template', templateSchema, 'product template');

module.exports=templateData