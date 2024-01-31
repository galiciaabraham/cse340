const utilities = require("../utilities")
const accountModel = require("../models/account-model")

const login = {}
/* ****************************************
*  Deliver login view
* *************************************** */
login.buildLogin = async function (req, res, next) {
    let nav = await utilities.getNav()
    res.render("account/login", {
      title: "Login",
      nav,
    })
  }

login.buildRegistration = async function (req, res, next) {
  let nav = await utilities.getNav()
  res.render("account/register", {
    errors: null,
    title: "Register",
    nav,
  })
}

/*Process Registration*/
login.registerAccount = async function (req, res) {
  let nav = await utilities.getNav()
  const {account_firstname, account_lastname, account_email, account_password} = req.body

  const regResult = await accountModel.registerAccount(
    account_firstname,
    account_lastname,
    account_email,
    account_password
  )

  if (regResult) {
    req.flash(
      "notice",
      `Congratulations, you\'re registered ${account_firstname}. Please log in.`)
      res.status(201).render("account/login",{
        title: "Login",
        nav,
      })
  } else {
    req.flash("notice", "Sorry, failed registration, please verify your information and try again.")
    res.status(501).render("account/register", {
      title: "Registration",
      nav,
    })
  }
}
  
  module.exports = login