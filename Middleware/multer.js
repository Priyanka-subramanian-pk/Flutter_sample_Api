const multer=require('multer')

const upload=multer({
    storage: multer.diskStorage({
        destination: function (req, file, cb) {
            console.log("destination",file);
            cb(null, 'uploads');
        },
        filename: function (req, file, cb) {
            const fileType = file.mimetype.split('/')[1]
            console.log(("filename",fileType));
            cb(null, file.fieldname + '-' + Date.now() + "." + fileType);
        } 
    }),
})
module.exports=upload