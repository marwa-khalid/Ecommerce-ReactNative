const mongoose = require("mongoose");

const pendingUserSchema = new mongoose.Schema(
  {
    username: {
        //properties
        type: String,
        unique: true
    },
    email: {
      type: String,
    },
    password: {
      type: String,
      required: true,
    },
    status:{
      type:String // pending, active, rejected
    },
    verificationCode: {
      type: String,
    },
    verified: {
      type: Boolean,
    },
    resetToken: {
      type: String,
    },
    resetTokenExpiration: {
      type: Date,
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Pending", pendingUserSchema);
