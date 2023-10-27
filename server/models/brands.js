const mongoose = require("mongoose");

const BrandSchema = new mongoose.Schema({
    brandName: {
        type: String,
        required: true,
    },

    image: {
        type: String,
    },

    password: {
        type: String,
    },
    email:{
        type: String,
    }

},
{ timestamps: true}

);

module.exports = mongoose.model("Brand" , BrandSchema);