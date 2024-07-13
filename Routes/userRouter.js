const express=require('express')
const router=express.Router()
const user=require('../Controller/userController')
const admin=require('../Controller/adminController')
const upload=require('../Middleware/multer')
const tryCatch=require('../Middleware/tryCatch')
const verifyToken=require('../utils/jwtToken')
router
.post('/registration',upload.single("file"),tryCatch(user.userRegistration))
.post('/login',tryCatch(user.userLogin))
.get('/getallproducts',verifyToken,tryCatch(admin.getProducts))
module.exports=router