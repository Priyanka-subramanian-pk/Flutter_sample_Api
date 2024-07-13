const userSchema = require("../Model/userModel");
const productSchema=require('../Model/productSchema')
const bcrypt = require("bcrypt");
require('dotenv').config()
const jwt=require('jsonwebtoken')

module.exports = {
  userRegistration: async (req, res) => {


    const { username, password } = req.body;
    console.log(req.body);
    const user = await userSchema.findOne({ username });
    if (user) {
      return res.status(400).json({
        message: "User already exist ",
        error: true,
        status: "failure",
      });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new userSchema({
      username,
      password: hashedPassword,
      image: req.file.filename,
    });
    await newUser.save();
    res.status(200).json({
      message: "User registered successfully",
      status: "success",
      error: false,
      data: newUser,
    });
  },
  userLogin: async (req, res) => {
    const { username, password } = req.body;

    const user = await userSchema.findOne({ username });
    if (!user || !(await bcrypt.compare(password, user.password))) {
     return  res.status(400).json({
        message: "User not exist",
        error: true,
        status: "failure",
      });
    } 
    {

      const secret =process.env.SECRET_KEY
      // console.log("secret",secret);
      const token=jwt.sign(
       {id:user.id,username:user.username} ,secret,
       { expiresIn: "24h" }
      )
       return  res.status(200).json({
          message: "User logged in successfully",
          status: "success",
          error: false,
          data: user,
          token:token
        });

    }
   
  },
  getproducts:async(req,res)=>{
    const product=await productSchema.find()
    if(!product){
      return res.status(400).json({
        message:"No products found ",
        status:"failure",
        error:true
      })
    }
    return res.status(200).json({
      message:"All products listed",
      status:"success",
      error:false
    })
  }
  
};
