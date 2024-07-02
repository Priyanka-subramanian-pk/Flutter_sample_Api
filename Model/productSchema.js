const mongoose=require('mongoose')
const productSchema=mongoose.Schema({
    productName:{
        type:String,
        require:true
    },
    productImage:{
        type:String,
        require:true
    },
    productPrice:{
        type:String,
        require:true
    }

})
const product=mongoose.model("product",productSchema)
module.exports=product