const router = require("express").Router();
const { Project, User, Watchlist } = require("../models");
const withAuth = require("./../helpers/utils/auth");
const path = require("path");

router.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../public/pages/index.html"));
});

//redirect to a route that shows the main page, when user has already logged in
router.get("/login", (req, res) => {
  console.log("GET /login");
  // If the user is already logged in, redirect the request to another route
  if (req.session.logged_in) {
    res.redirect("/");
    //
    return;
  }

  res.sendFile(path.join(__dirname, "../public/pages/login.html"));
});

//
router.get("/signUp", (req, res) => {
  console.log("GET /signUp");
  if (req.session.logged_in) {
    res.redirect("/");
    return;
  }

  res.sendFile(path.join(__dirname, "../public/pages/signup.html"));
});

module.exports = router;
