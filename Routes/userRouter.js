const express=require('express')
const router=express.Router()
const user=require('../Controller/userRegistration')
const upload=require('../Middleware/multer')
const tryCatch=require('../Middleware/tryCatch')
router
.post('/registration',upload.single("file"),tryCatch(user.userRegistration))
.post('/login',tryCatch(user.userLogin))
module.exports=router