const Brand = require("../models/brands");
const router = require("express").Router();
const Product = require("../models/Product")

router.get("/", async (req,res)=>{
    try{
const brands = await Brand.find();
res.status(200).json(brands);
    }catch(err){
        res.status(500).json(err);
    }
});

router.get("/", async (req, res) => {
    try {
      const brand = req.body;
  
      const products = await Product.find({ brand: brand});
  
      // Check if there are products associated with the brand
      if (products.length === 0) {
        return res.status(404).json({ message: "No products found for this brand." });
      }
  
      res.status(200).json(products);
    } catch (error) {
      console.error("Error fetching products:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  });

 router.post('/', async (req, res) => {
    const brandData = req.body; // Assuming the request body contains brand data

    console.log(req.body)
    const brand =  new Brand({
      email: brandData.email,
      password: brandData.password,
      brandName: brandData.brandName,
    });
  
    await brand.save();
  
    return res.status(201).json({ message: 'Brand added successfully'});
  });
  
module.exports = router; 