const AuthOperations = require('../utils/authenticationutils.js')
const jwt = require('jsonwebtoken');



const login = (req, res) => {
	try {
		const auth= new AuthOperations

		const credentials={username:req.body.username,password:req.body.password}
		
		auth.findUser(credentials)
		.then(data=>{
			console.log(data)
			
			const token = jwt.sign(data, 'your_secret_key', { expiresIn: '3d' });

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

module.exports = { login };
