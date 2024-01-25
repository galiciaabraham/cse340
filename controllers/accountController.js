const utilities = require("../utilities")

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
  
  module.exports = login