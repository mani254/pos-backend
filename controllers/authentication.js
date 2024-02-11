const AuthOperations = require('../utils/authenticationutils.js')
const jwt = require('jsonwebtoken');
require('dotenv').config()


const login = (req, res) => {
	try {
		const auth= new AuthOperations

		const credentials={username:req.body.username,password:req.body.password}
		
		auth.findUser(credentials)

		.then(data=>{
			console.log(data)
			const {username,storeId,superAdmin,branchId}=data
			
			const token = jwt.sign({username,storeId,superAdmin,branchId}, process.env.JWT_SECRET_KEY, { expiresIn: '3d' });

			res.cookie('token', token, { httpOnly: true,secrure:true,sameSite:true})

			res.status(200).json({type:'success',message:'Loged in succesfully'});

		})
		.catch(err=>{
			console.log(err.message)

			if(err.message.includes('user not found')){
				res.status(401).send({type:'error',message:'User not found'})
			}
			else{
				res.status(500).json({type:'error',message: 'Internal server error' });
			}
		})

	} catch (err) {
		console.err(err.message);
        res.status(500).json({type:'error',message: 'Internal server error' });
	}
};

const main = (req,res)=>{
	try{
		if(!req.cookies.token){
			return res.status(401).send({type:'warning',message: 'Login here'})
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
