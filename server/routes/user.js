const express = require("express");
const bcrypt = require("bcryptjs");
const router = express.Router();
const User = require("../models/approve");
const e = require("express");
const Pending = require('../models/user');

//Authentication routes
router.post("/register", async (req, res) => {
  try {
    // if (!req.file) {
    //   return res.status(400).send('No file uploaded.');
    // }
    const {
      username,
      email,
      password,
      status
    } = req.body;

     // Encrypt password
     const hashedPassword = await bcrypt.hash(password, 10);
     console.log(hashedPassword)

    const existingUser = await Pending.findOne({ email });
    if (existingUser) {
      if(existingUser.status === "approved"){
        return res.status(422).json({ message: "Email already exists" });
      }
      else if (existingUser.status === "pending") {
        return res.status(400).json({ message: "Account already send for approval" });
      }
    }
    else{

        const pending = new Pending({
          username,
          email: email.toLowerCase(),
          password: hashedPassword,
          status: 'pending',
          verificationCode:'',
          resetToken:'',
          resetTokenExpiration:''
        });
        await pending.save();

    }

    // Registration successful
    return res.json({ message: "Registration Done: Account send for approval" });

    // res.status(200).json(response);
  } catch (error) {
    console.error("Error registering user:", error);
  }
});

// Login user

router.post("/login", async (req, res) => {
  const { username, password} = req.body;
  
  try {
    const user = await Pending.findOne({ username: username.toLowerCase() });
    if (user) {
      const isPasswordMatch = await bcrypt.compare(password, user.password);
      if (!isPasswordMatch) {
        return res.status(402).json({ message: "Invalid password" });
      }
      return res.send({
        message: "Logged in successfully",
        user: {
          email: user.email,
          username: user.username,
          id: user._id
        },
      });
    }
    else{
      return res.status(400).json({ message: "User doesn't exist with this email" });
    }
  }
  catch (error) {
    return res.status(400).send("Error logging user", error);
  }
});

//get single record
router.get("/:id", async (req, res) => {
  //fetch one user data and send
  try {
    //await for async return
    const user = await User.findById(req.params.id);
    //send in json format.. .send will send in text form
    res.json(user);
    console.log("Get Request by ID Worked");
  } catch (err) {
    res.send("Error: " + err);
  }
});

router.get("/", async (req, res) => {
  //fetch all users and send
  try {
    //await for async return
    const user = await Pending.find();
    //send in json format.. .send will send in text form
    res.json(user);
    console.log("Get Request Worked");
  } catch (err) {
    res.send("Error: " + err);
  }
});

// router.get("/", async (req, res) => {
//   try {
//     const users = await Pending.find({}, "name email createdAt address status _id");
//     res.json(users);
//   } catch (error) {
//     console.error("Error fetching users:", error);
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// });



router.put("/:id", async (req, res) => {
  const user = await User.findById(req.params.id);

  user.fullName = req.body.fullName;
  user.email = req.body.email;
  user.phoneNumber = req.body.phoneNumber;
  user.image = req.body.image;

  user.save((err) => {
    if (err) {
      res.send(err);
      console.log("Can't update data: " + err);
    } else {
      //display in json format
      res.json(user);
      console.log("Data Updated");
    }
  });
});

// User management API endpoints
router.put('/:id/approve', (req, res) => {
  const userId = req.params.id;
  console.log(userId)

  // Find the user by ID and update the status to 'approved'
  Pending.findByIdAndUpdate(userId, { status: 'approved' }, (err, user) => {
    if (err) {
      // Handle error
      res.status(500).json({ error: 'Failed to approve user' });
    } else {
      // Handle successful approval
      res.status(200).json({ message: 'User approved' });
    }
  });
});

router.put('/:id/reject', (req, res) => {
  const userId = req.params.id;

  // Find the user by ID and update the status to 'rejected'
  Pending.findByIdAndUpdate(userId, { status: 'rejected' }, (err, user) => {
    if (err) {
      // Handle error
      res.status(500).json({ error: 'Failed to reject user' });
    } else {
      // Handle successful rejection
      res.status(200).json({ message: 'User rejected' });
    }
  });
});


//user status update by admin 

router.put("/:id", async (req, res) => {
  try {
    const user = await Pending.findById(req.params.id);
    user.status = req.body.status;
    const updatedStatus = await res.status.save();
    res.json(updatedStatus);
  }
  catch (error) {
    return res.status(404).json({ message: "User not found" });
  }
});


module.exports = router;
