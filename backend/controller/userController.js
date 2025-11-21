const User = require("../models/User")

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

module.exports = {RegisterUser}