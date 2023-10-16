const mongoose = require("mongoose");

const BrandSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },

    image: {
        type: String,
        required: true
    },

    rating: {
        type: Number,
        required: true,
        
    },

    category: {
        type: String,
    },

},
{ timestamps: true}

);

module.exports = mongoose.model("Brand" , BrandSchema);