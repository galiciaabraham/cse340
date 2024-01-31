const express = require("express");
const router = new express.Router();
const utilities = require("../utilities")
const accountController = require("../controllers/accountController")

//Route to build inventory by classification view
router.get("/login", utilities.handleErrors(accountController.buildLogin));
router.get("/registration", utilities.handleErrors(accountController.buildRegistration))

//Route to post a new user registration
router.post("/register", utilities.handleErrors(accountController.registerAccount))

module.exports = router;
