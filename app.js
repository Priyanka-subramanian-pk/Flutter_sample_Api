const express=require('express')
const port=9000
const mongoose=require('mongoose')
const userRouter=require('./Routes/userRouter')
const adminRouter=require('./Routes/adminRouter')
const app=express()
app.use(express.json())
app.get("/",(req,res)=>{
    res.send("hello all")
})
app.use('/api/user',userRouter)
app.use('/api',adminRouter)

mongoose.connect('mongodb+srv://priyankapk793:Ow2nafrEhlS83YR9@cluster0.zmebvjf.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')
.then(()=>{console.log("database connected successfully")})
.catch((error)=>console.error("error",error))


app.listen(port,(req,res)=>{
    console.log(`server is running on port${port}`)
})