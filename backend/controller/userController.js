const User = require("../models/User")
const jwt = require('jsonwebtoken')
const RegisterUser = async(req,res)=>{
    try{
        const {name,email,password,role}  = req.body
        const test = await User.findOne({email});
        if(!test){
        const create = new User({
            name,email,password,role
        })
        const newUser = await create.save()
        res.status(201).json({newUser,message:"User Registration Successfull"})
        }
        else{
            res.status(409).json({message:"User Already Exists"})

        }
    }
    catch(err){
        res.status(500).json({message:"Error Registering User"})
    }
}

const LoginUser = async(req,res)=>{
    try{
    const{email,password} = req.body
    const test = await User.findOne({email})
    if(test){
        const same = await test.comparePassword(password)
        if(same){
            const token = jwt.sign({ id: test._id }, process.env.JWT_SECRET, { expiresIn: "1h" })
            res.status(200).json({token,test,message:"Login Successfull"})
        }
        else{
            res.status(409).json({message:"Invalid User Credentials"})

        }
    }
    else{
        res.status(409).json({message:"User Doesn't Exists"})
    }}
    catch(err){
        res.status(500).json({message:"Error Logging User"})
    }
}

module.exports = {RegisterUser,LoginUser}