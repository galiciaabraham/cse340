const invModel = require("../models/inventory-model")
const utilities = require("../utilities/")

const invCont = {}

/* 
Build inventory by classification view
*/
invCont.buildByClassificationId = async function (req, res, next) {
    const classification_id = req.params.classificationId
    const data = await invModel.getInventoryByClassificationId(classification_id)
    let grid
    if (data.length >= 1){
        grid = await utilities.buildClassificationGrid(data)
        let nav = await utilities.getNav()
        const className = data[0].classification_name
        res.render("./inventory/classification", {
            title: className + " vehicles",
            nav,
            grid,
    })
    } else {
        grid = `<h2>Sorry, we currently have no cars related to this type! </h2>`
        let nav = await utilities.getNav()
        const className = await invModel.getClassificationName(classification_id)
        res.render("./inventory/classification", {
        title: className + " vehicles",
        nav,
        grid,
    })
    }
}
/* Build the details page by product id */
invCont.buildDetailsPage = async function (req, res, next) {
    const product_id = req.params.invId
    const data = await invModel.getCarDetailsById(product_id)
    //console.log(data)//For testing only...
    const grid = await utilities.buildDetailsGrid(data)
    let nav = await utilities.getNav()
    const className = `${data[0].inv_year} ${data[0].inv_make} ${data[0].inv_model}`
    res.render("./inventory/detail", {
        title: className,
        nav,
        grid,
    })
}

invCont.buildManagement = async function(req, res,next) {
    let nav = await utilities.getNav()
    // req.flash("notice", "This is a test message for the management page")
    res.render("inventory/management",{
      title: "Inventory Management",
      nav,
    })
  }

invCont.buildAddClass = async function(req, res, next) { 
    let nav = await utilities.getNav()
    res.render("inventory/add-classification",{
      title: "Add Classification",
      nav,
      errors: null
    })
}

/*Process Registration*/
invCont.addClassification = async function (req, res) {
    let nav = await utilities.getNav()
    const {classification_name} = req.body
  
    const addClassResult = await invModel.addClassification(
      classification_name
      )
  
    if (addClassResult) {
      req.flash(
        "notice",
        `Congratulations, you successfully added the new classification "${classification_name}".`)
        res.status(201).render("inventory/add-classification",{
            title: "Add Classification",
            nav,
            errors: null
          })
    } else {
      req.flash("notice", "Sorry, addition failed, please verify the information and try again. Or contact us for more support cse340@support.com")
      res.status(501).render("inventory/add-classification",{
        title: "Add Classification",
        nav,
        errors: null
      })
    }
  }

module.exports = invCont;