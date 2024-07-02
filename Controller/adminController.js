const productSchema = require("../Model/productSchema");

module.exports = {
  addProduct: async (req, res) => {
    const { productName, productPrice } = req.body;
    const product = await productSchema.findOne({ productName });
    if (product) {
      return res.status(400).json({
        message: "Product alreday exist",
        status: "failure",
        error: true,
      });
    }
    const newProduct = new productSchema({ productName, productPrice,productImage:req.file.filename });
    await newProduct.save();
    return res.status(200).json({
      message: "Product added successfully",
      status: "success",
      error: false,
    });
  },
  getProducts: async (req, res) => {
    const product = await productSchema.find();
    if (!product)
      return res.status(400).json({
        message: "No products found",
        status: "failure",
        error: true,
      });
    return res.status(200).json({
      message: "Products found",
      status: "success",
      error: "false",
      data: product,
    });
  },
  getOneProduct:async(req,res)=>{
    const productId=req.params.Id
    const product=await productSchema.findById(productId)
    if(!product){
        return res.status(400).json({
            message:"No product found",
          status: "failure",
        error: true,

        })
    }
    return res.status(200).json({
        message: "Product found",
        status: "success",
        error: "false",
        data: product,
      });


  }
};
