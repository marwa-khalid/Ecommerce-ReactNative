const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema({
    customerName: {
        type: String,
        required:false
    },
    products: [
        {
            title: {
                type: String,
            },
            quantity: {
                type: Number,
                default: 1,
            }
        },
    ],
    amount: {
        type: Number,
    },
    address: {
        type: String,
    },
    status: {
        type: String,
        default: "pending",
    },
    brand:{
        type:String
    }
},
{ timestamps: true });

module.exports = mongoose.model("Order" , OrderSchema);