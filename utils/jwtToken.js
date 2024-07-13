const jwt=require('jsonwebtoken')

const verifyToken=(req,res,next)=>{
    const authHeader=req.headers.authorization;
    if(!authHeader){
        return res.status(400).json({
            message:"Un authorized "
        })
    }
    const token=authHeader.split(" ")[1]
jwt.verify(token,process.env.SECRET_KEY,(error,decoded)=>{
    if(error){
        return res.status(400).json({
            error:"Invalid token"
        })
    }
    req.user=decoded;
    console.log("req.user",req.user);
    next()
})
}
module.exports =verifyToken