const utilities = require("../utilities")
const accountModel = require("../models/account-model")
const bcrypt = require("bcryptjs")

const login = {}
/* ****************************************
*  Deliver login view
* *************************************** */
login.buildLogin = async function (req, res, next) {
    let nav = await utilities.getNav()
    res.render("account/login", {
      errors: null,
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

  // Hash the password before storing
  let hashedPassword
  try {
    // regular password and cost (salt is generated automatically)
    hashedPassword = await bcrypt.hashSync(account_password, 10)
  } catch (error) {
    req.flash("notice", 'Sorry, there was an error processing the registration.')
    res.status(500).render("account/register", {
      title: "Registration",
      nav,
      errors: null,
    })
  }

  const regResult = await accountModel.registerAccount(
    account_firstname,
    account_lastname,
    account_email,
    hashedPassword
  )

  if (regResult) {
    req.flash(
      "notice",
      `Congratulations, you\'re registered ${account_firstname}. Please log in.`)
      res.status(201).render("account/login",{
        errors: null,
        title: "Login",
        nav,
      })
  } else {
    req.flash("notice", "Sorry, failed registration, please verify your information and try again.")
    res.status(501).render("account/register", {
      errors: null,
      title: "Registration",
      nav,
    })
  }
}
  
  module.exports = login