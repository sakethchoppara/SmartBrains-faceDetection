const express = require('express');
const router = express.Router();
const User = require('../model/userModel');
const jwt = require('jsonwebtoken');
const {JWT_KEY,verifyToken} = require('../jwt/jwt');
const user = require('../model/userModel');
const {getBoundingBoxes} = require('../facedetection/faceDetectionApi');
const { NOEXPAND } = require('sequelize/lib/table-hints');

router.post('/signin',async(req,res)=>{
    const {email,password} = req.body
    try{
        const user = await User.findOne({
            where:{
                email:email
            }
        })
        if(password === user.get('password')){
            const token = jwt.sign({id:user.get('id'),username:user.get('username'),email:email},JWT_KEY,{expiresIn:'1hr'});
            return res.status(200).json(
                {
                    token:token,
                    status:true
                }
            )
        }
        else{
            return res.status(400).json(
                {
                    status:false,
                    message:'password does not match or user not found'
                }
            )
        }
        } 
        catch(err){
            return res.status(203).json(
                {
                    status:false,
                    message:`error at finding the user in database ${err}`
                }
            )
            }
        }
    )   

router.post('/register',async(req,res)=>{
    const {username,email,password} = req.body
    try{
        const newUser = await User.create({
            username,
            email,
            password
        })
        res.json(
            {status:true}
        )
    }
    catch(error){
        res.status(203).json({
            status:false,
            message:`error while creating the user ${error}`
        })
    }
})


router.get('/home',verifyToken,(req,res)=>{
    res.json({
        status:true
    })
})


router.post('/home',(req,res)=>{
    const {image} = req.body
    console.log(req.body)
    getBoundingBoxes(image).then(box=>res.json({
        box:box
    }))

})



module.exports = {
    router
}