const mongoose = require('mongoose');

const approvedRequestSchema = new mongoose.Schema({

    name: {
        //properties
        type: String,
    },
    email: {
      type: String,
    },
    phoneNumber: {
      type: String,
    },
    address: {
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

const ApprovedRequest = mongoose.model('ApprovedRequest', approvedRequestSchema);

module.exports = ApprovedRequest;
