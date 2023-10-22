const express = require("express");
const app=express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");

const userRoute = require("./routes/user");
const productRoute = require("./routes/product");
const cartRoute = require("./routes/cart");
const orderRoute = require("./routes/order");
const paymentRoute = require("./routes/payment");
const brandsRoute = require('./routes/brands');
const wishlistRoute = require('./routes/wishlist')
const resetRoute = require('./routes/reset')
const reviewRoute= require('./routes/reviews')

dotenv.config();

const DB = 'mongodb://marwakhalid:marwamarwa@marwa-shard-00-00.x9zjp.mongodb.net:27017,marwa-shard-00-01.x9zjp.mongodb.net:27017,marwa-shard-00-02.x9zjp.mongodb.net:27017/Off?ssl=true&replicaSet=atlas-6szo5v-shard-0&authSource=admin&retryWrites=true&w=majority';

app.use(cors());

mongoose.connect(DB,{}).then(()=>{
    console.log("connection successful");
}).catch((err)=>console.log("no connection"));

app.use(express.json());
app.use("/api/users", userRoute);
app.use("/api/products", productRoute);
app.use("/api/carts", cartRoute);
app.use("/api/orders", orderRoute);
app.use("/api/payments", paymentRoute);
app.use("/api/brands", brandsRoute);
app.use("/api/wishlist", wishlistRoute);
app.use('/api/reset', resetRoute);
app.use("/api/reviews",reviewRoute);

app.use(express.static("../client"));
app.use('/uploads', express.static('uploads'));

app.listen(5002, ()=>{
    console.log("backened is running");
});
