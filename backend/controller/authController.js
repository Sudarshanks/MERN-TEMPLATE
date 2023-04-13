const User=require('../model/userModel')
const bcrypt=require('bcryptjs')
const {createAccessToken,sendResponseWithCookie}=require('../util/token')

const userController={
    register:async(req,res)=>{
        try{
            const {name,email,password,mobile}= req.body

            //email validation
            let extEmail=await User.findOne({email})
            if(extEmail)
            return res.status(400).json({msg:`sorry ${email} mail id is already registered`})

           // mobile number validation
            let extMobile=await User.findOne({mobile})
            if(extMobile) 
            return res.status(400).json({msg:`sorry ${mobile} number is already registered`})

            //generating password salt(10-bit)
            let passHash=await bcrypt.hash(password,10)//(input,salt bit)


            const newUser=await User.create({
                name,
                email,
                mobile,
                password:passHash
            })

            res.json({msg:"User Registered Successfully",user:newUser})
        }catch(err){
            return res.status(500).json({msg:err.message})
        }

    },
    login:async(req,res)=>{
        try{
            const { email,password}=req.body
            let extUser =await User.findOne({email})
                if(!extUser)
                return res.status(404).json({msg:`${email}is not registered`})

                //compare password
                let comPass=await bcrypt.compare(password,extUser.password)//bcrypt.compare(string,salt)
                if(!comPass)
                return res.status(400).json({msg:"password doesn't matched. "})//400-bad request

                let authToken=await createAccessToken({id:extUser._id})
                    await sendResponseWithCookie({res,id:extUser._id})

            res. status(200).json({ msg:"login successful",authToken})
        }catch(err){
            return res.status(500).json({msg:err.message})//500 internal server error
        }

        
    },
    logout:async(req,res)=>{
        try{
            res.json({msg:"logout"})
        }catch(err){
            return res.status(500).json({msg:err.message})
        }

        
    },
    currentUser:async(req,res)=>{
        try{
            res.json({msg:"current user"})
        }catch(err){
            return res.status(500).json({msg:err.message})
        }

        
    },
    forgetPassword:async(req,res)=>{
        try{
            res.json({msg:"Forgot password"})
        }catch(err){
            return res.status(500).json({msg:err.message})
        }

        
    },
    validateAuth:async(req,res)=>{
        try{

        }catch(err){
            return res.status(500).json({msg:err.message})
        }
    }
   
}
module.exports=userController