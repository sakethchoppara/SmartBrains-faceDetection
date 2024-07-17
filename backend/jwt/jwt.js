const jwt = require('jsonwebtoken');
require('dotenv').config()

const JWT_KEY = process.env.JWT_KEY;

const verifyToken = (req,res,next) =>{
    token = req.headers['auth']
    if(!token){
        return res.status(403).json({
            'status':false,
            message:'token required'
        })
    }
    jwt.verify(token,JWT_KEY,(err,decoded)=>{
        if(err){
            return res.status(403).json({
                status:false,
                message:'invalid token'
            })
        }
        
        req.user = decoded
        next()
    })
}


module.exports = {verifyToken,JWT_KEY}