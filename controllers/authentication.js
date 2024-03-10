const AuthOperations = require('../utils/authenticationutils.js')
const jwt = require('jsonwebtoken');
require('dotenv').config()


const login = async (req, res) => {
	try {
		const auth= new AuthOperations

		const credentials={email:req.body.email,password:req.body.password}
		
		const data=await auth.findUser(credentials)

		if(data.status===401){
			return res.status(401).send({type:'error',message:'User not found'});
		}
		
		console.log(data)
		const {username,storeId,superAdmin,branchId,storeName}=data
		
		const token = jwt.sign({username,storeId,superAdmin,branchId,storeName}, process.env.JWT_SECRET_KEY, { expiresIn: '3d' });

		res.cookie('token', token, { httpOnly: true,secrure:true,sameSite:true})

		return res.status(200).json({type:'success',message:'Loged in succesfully'});
		

	} catch (err) {
		console.log(err.message);
        res.status(500).json({type:'error',message: err.message});
	}
};

const main = (req,res)=>{
	try{
		if(!req.cookies.token){
			return res.status(204).send({type:'warning',message: 'Login here'})
		}
		const decoded=jwt.decode(req.cookies.token,process.env.JWT_SECRET_KEY)

		if (decoded){
			res.status(200).send(decoded)
		}
		else{
			res.status(401).send({type:'error',message: 'Token Exipired Login Again'})
		}
	}
	catch(err){
		console.log(err.message)
		res.status(500).json({type:'error',message: 'Internal server error' });
	}
}

module.exports = { login,main};
