const express = require("express");
const router = new express.Router();
const utilities = require("../utilities")
const accountController = require("../controllers/accountController")
const regValidate = require("../utilities/account-validation")

//Route to build login, registration views
router.get("/login", utilities.handleErrors(accountController.buildLogin));
router.get("/registration",
    //utilities.passwordButton(),
    utilities.handleErrors(accountController.buildRegistration))

//Route to post a new user registration
router.post("/register",
    regValidate.registrationRules(),
    regValidate.checkRegData,
    utilities.handleErrors(accountController.registerAccount))

// Process the login attempt using a post request
router.post(
        "/login", 
        regValidate.loginRules(),
        regValidate.checkLoginData,
        (req, res) => {
          res.status(200).send('login process')
        }
      )

module.exports = router;
