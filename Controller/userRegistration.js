const userSchema=require('../Model/userModel')
const bcrypt= require('bcrypt')
module.exports={
    userRegistration:async(req,res)=>{
        const{username,password}=req.body
        console.log(req.body);
        const user=await userSchema.findOne({username})
        if(user){
            return res.status(400).json({
                message:"User already exist ",
                error:true,
                status:"failure"
            })
        
        }
        const hashedPassword=await bcrypt.hash(password,10)
        const newUser=new userSchema({username,password:hashedPassword,
            image:req.file.filename
        })
      await newUser.save()
      res.status(200).json({
        message:"User registered successfully",
        status:"success",
        error:false
      })
    },
    userLogin:async(req,res)=>{
        const{username,password}=req.body

const user= await userSchema.findOne({username})
if(!user || !(await bcrypt.compare(password, user.password))){
    res.status(400).json({
        message:"User not exist",
        error:true,
        status:"failure"
    })
}
else

res.status(200).json({
    message:"User logged in successfully",
    status:"success",
    error:false
})




}
    
}