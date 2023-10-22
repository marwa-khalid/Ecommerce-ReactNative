const express = require("express");
const router = express.Router();
const nodemailer = require("nodemailer");
const crypto = require("crypto");
const bcrypt = require("bcryptjs");

router.post("/:email", async(req, res) => {
  const email = req.params.email;
  console.log(email)
    
    const token = crypto.randomBytes(2).toString("hex");
    const tokenExpiration = Date.now() + 3600000;

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "marwakhalid558@gmail.com",
        pass: "lzwh rpnh sbmf skal",
      },
    });

    const mailOptions = {
      from: "marwakhalid558@gmail.com",
      to: email,
      subject: "Verification code for registration",
      html: `<p>You have requested to register on OFF. Here is your verification code.</p>
      <a href="${token}">${token}</a>`
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
       console.log("Error sending email:", error);
        res.status(500).json({ success:false, message: "An error occurred. Please try again later." });
      } else {
        console.log("Email sent:", info.response);
        res.json({ success:true ,message: "Email sent successfully.",token:{token:token,tokenExpiration:tokenExpiration} });
      }
    });
  }
);

router.post("/confirm", async(req, res) => {
  try{
    const {code,token,expiration} = req.body.code;
    console.log(req.body);
    if(token != code){
      return res.status(400).send({success:false, message:"Code is wrong"});
    }
    if(expiration < new Date()){
      return res.status(400).send({success:false, message:"Token has expired"});
    }
    
    return res.status(200).json({ message: "User Verified" });
  }
  catch(err){
    console.log(err);
    return res.status(500).send({success:false, message:"error"})
  }
});

module.exports = router;