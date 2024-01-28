const express=require('express');
const mongoose=require('mongoose');
const dotenv=require('dotenv')
const cors=require('cors')
const bodyparser=require('body-parser')
const cookieParser=require('cookie-parser')

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
app.use(cors({credentials:true,origin:process.env.FRONTEND_URI}))

app.use(bodyparser.urlencoded({ extended: true }))
app.use(bodyparser.json())
app.use(cookieParser())




// ***** routes ******

app.use('/authentication',require('./routes/authenticationRoutes.js'))
app.use('/product',require('./routes/productRoutes.js'))
app.use('/staff',require('./routes/staffRoutes.js'))
app.use('/producttemplate',require('./routes/productTemplateRoutes.js'))
app.use('/order',require('./routes/orderRoutes.js'))
app.use('/branch',require('./routes/branchRoutes.js'))




//listening to port

const PORT = process.env.PORT || 8080;

app.listen(PORT,()=>{console.log(`listening on port ${PORT}`)})