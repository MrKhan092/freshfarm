const express = require("express");
const router = express.Router();
const passport = require("passport");
const User = require("../models/user.js");
const wrapAsync = require("../utils/wrapAsync"); // Assuming wrapAsync is a utility function to handle async errors

router.get("/signup", (req, res) => {
  res.render("users/signup.ejs");
});

// router.post("/signup", wrapAsync(async (req, res) => {
//   try {
//     const { username, email, password } = req.body;
//     const newUser = new User({ email, username });
//     const registeredUser = await User.register(newUser, password);
//     console.log(registeredUser);
//     req.flash("success", "Welcome to Wanderlust!");
//     res.redirect("/listings");
//   } catch (e) {
//     req.flash("error", e.message);
//     res.redirect("/signup");
//   }
// }));

router.post("/signup", wrapAsync(async (req, res) => {
    const { username, email, password } = req.body;
  
    const usernameRegex = /^(?=.*[a-zA-Z])[a-zA-Z0-9]{4,}$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  
    if (!usernameRegex.test(username)) {
      req.flash("error", "Username must be at least 4 alphanumeric characters and include at least one letter.");
      return res.redirect("/signup");
    }
  
    if (password.length < 4) {
      req.flash("error", "Password must be at least 4 characters long.");
      return res.redirect("/signup");
    }
  
    if (!emailRegex.test(email)) {
      req.flash("error", "Please enter a valid email address.");
      return res.redirect("/signup");
    }
  
    try {
      const newUser = new User({ email, username });
      const registeredUser = await User.register(newUser, password);
      req.flash("success", "Welcome to Wanderlust!");
      res.redirect("/listings");
    } catch (e) {
      req.flash("error", e.message);
      res.redirect("/signup");
    }
  }));
  

router.get("/login", (req, res) => {
  res.render("users/login.ejs");
});

router.post("/login", passport.authenticate("local", {
  failureRedirect: "/login", 
  failureFlash: true,
}), async (req, res) => {
  req.flash("success", "Welcome back to Wanderlust!");
  res.redirect("/listings");
});

router.get("/logout", (req, res, next) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    req.flash("success", "You are logged out!");
    res.redirect("/listings");
  });
});

module.exports = router;
