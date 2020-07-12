const express = require('express');
const router = express.Router();

const jwt = require('jsonwebtoken');
const User = require('../models/users');

// SIGN UP FORM
router.get("/sign-up", (req, res) => {
    res.render("sign-up");
  });


  // SIGN UP POST
  router.post("/sign-up", (req, res) => {
    // Create User and JWT
    const user = new User(req.body);
  
    user
      .save()
      .then(user => {
        var token = jwt.sign({ _id: user._id }, process.env.SECRET, { expiresIn: "60 days" });
        res.redirect("/login");
      })
      .catch(err => {
        console.log(err.message);
        return res.status(400).send({ err: err });
      });
  });

  // LOGOUT
  router.get('/logout', (req, res) => {
  //  console.log("_____________")
  //  console.log("User logged out")
  //  console.log("_____________")
   res.clearCookie('nToken');
   res.redirect('/');
 });

 // LOGIN FORM
 router.get('/login', (req, res) => {
    res.render('login');
  });

  // LOGIN
router.post("/login", (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  // Find this user name
  User.findOne({ username }, "username password")
    .then(user => {
      if (!user) {
        // User not found
        return res.status(401).send({ message: "Wrong Username or Password" });
      }
      // Check the password
      user.comparePassword(password, (err, isMatch) => {
        if (!isMatch) {
          // Password does not match
          return res.status(401).send({ message: "Wrong Username or password" });
        }
        // Create a token
        const token = jwt.sign({ _id: user._id, username: user.username }, process.env.SECRET, {
          expiresIn: "60 days"
        });

        console.log("_____________")
        console.log("User logged in")
        console.log("_____________")
        // Set a cookie and redirect to root
        res.cookie("nToken", token, { maxAge: 900000, httpOnly: true });
        res.redirect("/");
      });
    })
    .catch(err => {
      console.log(err);
    });
});

module.exports = router