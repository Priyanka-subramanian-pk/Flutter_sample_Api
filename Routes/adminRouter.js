const  express=require('express')
const router=express.Router()
const admin=require('../Controller/adminController')
 const upload=require('../Middleware/multer')
 const tryCatch=require('../Middleware/tryCatch')

router
.post('/admin/addProduct',upload.single('file'),tryCatch(admin.addProduct))
.get("/admin/getAllProducts",tryCatch(admin.getProducts))
.get("/admin/getOneProduct/:Id",tryCatch(admin.getOneProduct))
module.exports=router