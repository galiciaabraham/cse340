const utilities = require(".")
const { body, validationResult} = require
("express-validator")
const validate = {}
const accountModel = require("../models/account-model")

/* 
Registration Data Validation Rules 
*/
validate.registrationRules = () => {
    return [
        //first name is required and must be a string
        body("account_firstname").trim().isLength({ min: 1}).withMessage("Please provide a first name"),
        //last name is required and must be a string
        body("account_lastname").trim().isLength({ min: 1}).withMessage("Please provide a last name"),
        //valid email is required and cannot already exist in data base.
        body("account_email").trim().isEmail().normalizeEmail().withMessage("A valid email is required.").custom(async (account_email) => {
    const emailExists = await accountModel.checkExistingEmail(account_email) //User the accountModel.checkExistingEmail method to check if the email exists in the database
    // it returns the row count 0 or 1 it shouldn't be more than 1
    if (emailExists) //using the emailExists variable it returns an error if the count returned more than 1
    {
      throw new Error("Email exists. Please log in or use different email")
    }
    }),
        body("account_password").trim().isStrongPassword({
            minLength: 12,
            minLowercase: 1,
            minUppercase: 1,
            minNumbers: 1,
            minSymbols: 1,
        }).withMessage("Password did not meet requirements"),
    ]
}

/*
Check data and return errors or continue to registration
*/ 
validate.checkRegData = async (req, res, next) => {
    const { account_firstname, account_lastname, account_email} = req.body
    let errors = []
    errors = validationResult(req)
    if(!errors.isEmpty()) {
        let nav = await utilities.getNav()
        res.render("account/register", {
            errors,
            title: "Registration",
            nav,
            account_firstname, //for stickiness 
            account_lastname, //for stickiness 
            account_email, //for stickiness 
        })
        return
    }
    next()
}

/* 
Registration Data Validation Rules 
*/
validate.loginRules = () => {
    return [
        body("account_email").trim().isEmail().normalizeEmail().withMessage("A valid email is required."),
        body("account_password").trim().isStrongPassword({
            minLength: 12,
            minLowercase: 1,
            minUppercase: 1,
            minNumbers: 1,
            minSymbols: 1,
        }).withMessage("Password did not meet requirements"),
    ]
}

/*
Check data and return errors or continue to login
*/ 
validate.checkLoginData = async (req, res, next) => {
    const {account_email} = req.body
    let errors = []
    errors = validationResult(req)
    if(!errors.isEmpty()) {
        let nav = await utilities.getNav()
        res.render("account/login", {
            errors,
            title: "Login",
            nav,
            account_email, //for stickiness 
        })
        return
    }
    next()
}

/* 
Update Account Data Validation Rules 
*/
validate.updateRules = () => {
    return [
        //first name is required and must be a string
        body("account_firstname").trim().isLength({ min: 1}).withMessage("Please provide a first name"),
        //last name is required and must be a string
        body("account_lastname").trim().isLength({ min: 1}).withMessage("Please provide a last name"),
        //valid email is required and cannot already exist in data base.
        body("account_email").trim().isEmail().normalizeEmail().withMessage("A valid email is required.").custom(async(account_email) => {
            const emailExists = await accountModel.checkExistingEmailUpdate(account_email) //User the accountModel.checkExistingEmail method to check if the email exists in the database
            // it returns the row count 0 or 1 it shouldn't be more than 1
             if (emailExists) //using the emailExists variable it returns an error if the count returned more than 1
            {
                throw new Error("Email exists. Please use a different email")
            }
        })
    ]
}

/*
Check data and return errors or continue to registration
*/ 
validate.checkUpdateData = async (req, res, next) => {
    const { account_firstname, account_lastname, account_email, account_id } = req.body
    let errors = []
    errors = validationResult(req)
    if(!errors.isEmpty()) {
        let nav = await utilities.getNav()
        const AccountName = account_firstname + " " + account_lastname
        res.status(501).render("account/update-account",{
            errors,
            title: `Update ${AccountName}'s  account information`,
            nav,
            account_firstname : account_firstname,
            account_lastname : account_lastname,
            account_email : account_email,
            account_id : account_id
          })
        return
    }
    next()
}

/* 
Update Password Validation Rules 
*/
validate.updatePwdRules = () => {
    return [
        body("account_password").trim().isStrongPassword({
            minLength: 12,
            minLowercase: 1,
            minUppercase: 1,
            minNumbers: 1,
            minSymbols: 1,
        }).withMessage("Password did not meet requirements"),
    ]
}

/*
Check data and return errors or continue to registration
*/ 
validate.checkPwdUpdate = async (req, res, next) => {
    const { account_id } = req.body
    let errors = []
    errors = validationResult(req)
    if(!errors.isEmpty()) {
        let nav = await utilities.getNav()
        const data = await accountModel.getAccountDetailsById(account_id)
        const AccountName = data.account_firstname + " " + data.account_lastname
        res.status(501).render("account/update-account",{
            errors,
            title: `Update ${AccountName}'s  account information`,
            nav,
            account_firstname : data.account_firstname,
            account_lastname : data.account_lastname,
            account_email : data.account_email,
            account_id : account_id,
          })
        return
    }
    next()
}

module.exports = validate