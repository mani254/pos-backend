const express=require('express');
const mongoose=require('mongoose');
const dotenv=require('dotenv')
const cors=require('cors')
const bodyparser=require('bodyparser')
//folder imports 

const app=express();
dotenv.config()

mongoose.connect(process.env.MONGODB_URI)
.then(()=>{
    console.log('connected to Database successfully')
})
.catch((err)=>{
    console.log(err.message)
});

//middleware
app.use(cors({credentials:true,origin:'http://localhost:3000/pos-backend'}))
app.use(bodyparser.urlencoded({ extended: true }))




// ***** routes ******

app.use('/authentication',require('./routes/authenticationRoutes.js'))
app.use('/product',require('./routes/productRoutes.js'))
app.use('/staff',require('./routes/staffRoutes.js'))
app.use('/producttemplate',require('./routes/productTemplateRoutes.js'))
app.use('/order',require('./routes/orderRoutes.js'))
app.use('/branch',require('/routes/branchRoutes.js'))




//listening to port

const PORT = process.env.PORT || 3000;

app.listen(PORT,()=>{console.log(`listening on port ${PORT}`)})