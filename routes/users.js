const express = require("express");
const router = require("express").Router();
const passport = require("passport");
const User = require("../models/User");
router.get("/", (req, res, next) => {
  res.render("index.ejs");
});
router.get("/google", passport.authenticate("google", { scope: ["profile"] }));

router.get(
  "/google/callback",
  passport.authenticate("google", { failureRedirect: "/login" }),
  function (req, res) {
    // Successful authentication, redirect home.
    res.redirect("/");
  }
);

router.get("/test", async (req, res) => {
  let user = await User.findOne({ id: "122"});
  console.log(user)
  res.send("ola mano");
});
module.exports = router;
