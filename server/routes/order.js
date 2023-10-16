const Order = require("../models/Order");

const router = require("express").Router();


//Create

router.post("/" , async (req,res)=>{
     const newOrder = new Order(req.body);

     try{
      const savedOrder = await newOrder.save();
      res.status(200).json(savedOrder);
     }catch(err){
        res.status(500).json(err)
     }
}); 


//update
router.put("/:id", async (req,res)=>{
    try{
       
       const updatedOrder = await Order.findByIdAndUpdate(req.params.id,{
        $set: req.body
       },
       {new:true}
       );
    
       res.status(200).json(updatedOrder);
    }catch(err){
      
        res.status(500).json(err);
    }
    
});

//Delete 

router.delete("/:id",async (req,res)=>{
    try{
        await Order.findByIdAndDelete(req.params.id)
        res.status(200).json("Order has been delted..")
    }catch(err){
       res.status(500).json(err)  
    }
});

//GET user orders

router.get("/find/:userId",  async (req, res)=>{
    try{
        const orders =  await Order.find({ userId: req.params.userId});
         res.status(200).json(orders);
    }catch(err){
       res.status(500).json(err)  
    }
});

//GET All 

router.get("/", async (req,res)=>{
    try{
const orders = await Order.find();
res.status(200).json(orders);
    }catch(err){
        res.status(500).json(err);
    }
});

//Get Monthly Income

router.get("/income",async (req,res)=>{
   const date = new Date();
   const lastMonth = new Date(date.setMonth(date.getMonth()-1));
   const previousMonth = new Date(new date.setMonth(lastMonth.getMonth() - 1)); 

   try{
     const income = await Order.aggregate([
        { $match: { createdAt: { $gte: previousMonth} } },
        {
            $project: {
                month: { $month: "$createdAt" },
                sales: "$amount" 
            },
        },
            {
               $group: {
                _id: "$month",
                total: { $sum: "$sales"}, 
               },
            },
        
     ]);
     res.status(200).json(income);
   } catch(err){
    res.status(500).json(err)
   }
});

 module.exports = router; 