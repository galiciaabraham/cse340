const approveModel = require("../models/approve-model")
const invModel = require("../models/inventory-model")
const utilities = require("../utilities")

const approveCont = {}
  
/*
Build approval management view
*/
  approveCont.buildApprovalManagement = async function(req, res,next) {
    let nav = await utilities.getNav()
    res.render("approval/approval-management",{
      title: "Inventory Approval Management",
      nav,
    })
  }
  
/*
Return List of items requiring approval.
*/
approveCont.getApprovalsList = async (req, res, next) => {
    const type = req.query.type
    let dbData
    if (type == 'classification') {
     dbData = await approveModel.getClassificationsWithoutApproval()
    } else if (type == 'inventory') {
      dbData = await approveModel.getInventoryWithoutApproval()
    }
    if (dbData) {
      return res.json(dbData)
    } else {
      next(new Error("No data returned"))
    }
  
  }
  
  /* 
  Build the reject item view  
  */
  approveCont.buildRejectUpdate = async function(req, res, next) {
    const item_id = parseInt(req.params.itemId)
    const itemType = req.query.type
    
    let nav = await utilities.getNav()
    let data
    let name
    if (itemType == 'classification') { 
      data = await invModel.getClassificationById(item_id)
      name = `${data[0].classification_name}`
      res.render("approval/reject-confirm-classification", {
        title: `Reject new classification: ${name}`,
        errors: null,
        nav,
        classification_id: data[0].classification_id,
        classification_name: data[0].classification_name
      })
    } else if (itemType == 'inventory') {
     data = await invModel.getCarDetailsById(item_id)
    name = `${data[0].inv_make} ${data[0].inv_model}`
     res.render("approval/reject-confirm-inventory",{
      title: `Reject new inventory item ${name}`,
      nav,
      errors: null,
      inv_id: data[0].inv_id,
      inv_year: data[0].inv_year,
      inv_make: data[0].inv_make,
      inv_model: data[0].inv_model,
      inv_description: data[0].inv_description,
      inv_image: data[0].inv_image,
      inv_price: data[0].inv_price,
      inv_miles: data[0].inv_miles,
      inv_color: data[0].inv_color,
    })
    }  
  }
  
  /* 
  Build the reject item view  
  */
  approveCont.buildApproveUpdate = async function(req, res, next) {
    const item_id = parseInt(req.params.itemId)
    const itemType = req.query.type
    
    let nav = await utilities.getNav()
    let data
    let name
    if (itemType == 'classification') { 
      data = await invModel.getClassificationById(item_id)
      name = `${data[0].classification_name}`
      res.render("approval/approve-confirm-classification", {
        title: `Approve new classification: ${name}`,
        errors: null,
        nav,
        classification_id: data[0].classification_id,
        classification_name: data[0].classification_name
      })
    } else if (itemType == 'inventory') {
     data = await invModel.getCarDetailsById(item_id)
    name = `${data[0].inv_make} ${data[0].inv_model}`
     res.render("approval/approve-confirm-inventory",{
      title: `Approve new inventory item: ${name}`,
      nav,
      errors: null,
      inv_id: data[0].inv_id,
      classification_id: data[0].classification_id,
      inv_year: data[0].inv_year,
      inv_make: data[0].inv_make,
      inv_model: data[0].inv_model,
      inv_description: data[0].inv_description,
      inv_image: data[0].inv_image,
      inv_price: data[0].inv_price,
      inv_miles: data[0].inv_miles,
      inv_color: data[0].inv_color,
    })
    } else if (itemType =='allinventory') {
      res.render("approval/approve-confirm-all",{
        title: `Approve all inventory`,
        nav,
        errors: null
      })
    }
  }
  
  /* 
  Reject inventory process
  */
  approveCont.rejectInvUpdate = async function (req, res) {
    const { inv_id } = req.body //Gets the values from the post request body
  
    const deleteResult = await invModel.deleteInventory ( inv_id ) //uses the invModel.deleteInventory method to delete the vehicle from the database which returns a fufilled or failed promise 
  
    if (deleteResult)  //if the promise was fufilled succesfully then creates a success flash message and uses the res.render function to return to the inventory management view 
    {
      req.flash("notice", `The vehicle has been rejected and deleted successfully.`)
      res.redirect("/approve/")
    } else //If the promise fulfilled with a failure it creates a failure message and uses res.render fn to return to the delete inventory page.
    {
      let nav = await utilities.getNav()
      req.flash("notice", "Sorry, the rejection failed, please verify the information and try again. Or contact us for more support at cse340@support.com")
      res.render("approval/approval-management",{
        title: "Inventory Approval Management",
        nav,
      })
    }
  }
/*Approve all the inventory that's not already approved*/
  approveCont.approveAllInv = async function (req, res) {
    const {  account_id } = req.body //Gets the values from the post request body
  
    const approveResult = await approveModel.approveAllInventory( account_id ) //uses the approveModel.deleteInventory method to delete the vehicle from the database which returns a fufilled or failed promise 
  
    if (approveResult)  //if the promise was fufilled succesfully then creates a success flash message and uses the res.render function to return to the inventory management view 
    {
      req.flash("notice", `The vehicles have been approved successfully.`)
      res.redirect("/approve/")
    } else //If the promise fulfilled with a failure it creates a failure message and uses res.render fn to return to the delete inventory page.
    {
      let nav = await utilities.getNav()
      req.flash("notice", "Sorry, the approval failed, please verify the information and try again. Or contact us for more support at cse340@support.com")
      res.render("approval/approval-management",{
        title: "Inventory Approval Management",
        nav,
      })
    }
  }
  
  /* 
  Approve inventory process
  */
  approveCont.approveInvUpdate = async function (req, res) {
    const { inv_id, account_id } = req.body //Gets the values from the post request body
  
    const approveResult = await approveModel.approveInventory ( inv_id, account_id ) //uses the approveModel.deleteInventory method to delete the vehicle from the database which returns a fufilled or failed promise 
  
    if (approveResult)  //if the promise was fufilled succesfully then creates a success flash message and uses the res.render function to return to the inventory management view 
    {
      req.flash("notice", `The vehicle has been approved successfully.`)
      res.redirect("/approve/")
    } else //If the promise fulfilled with a failure it creates a failure message and uses res.render fn to return to the delete inventory page.
    {
      let nav = await utilities.getNav()
      req.flash("notice", "Sorry, the approval failed, please verify the information and try again. Or contact us for more support at cse340@support.com")
      res.render("approval/approval-management",{
        title: "Inventory Approval Management",
        nav,
      })
    }
  }

  /* 
  Reject inventory process
  */
  approveCont.rejectClassUpdate = async function (req, res) {
    const { classification_id } = req.body //Gets the values from the post request body
  
    const deleteResult = await invModel.deleteClassification ( classification_id ) //uses the invModel.deleteInventory method to delete the vehicle from the database which returns a fufilled or failed promise 
  
    if (deleteResult)  //if the promise was fufilled succesfully then creates a success flash message and uses the res.render function to return to the inventory management view 
    {
      req.flash("notice", `The classification has been rejected and deleted successfully.`)
      res.redirect("/approve/")
    } else //If the promise fulfilled with a failure it creates a failure message and uses res.render fn to return to the delete inventory page.
    {
      let nav = await tilities.getNav()
      req.flash("notice", "Sorry, the rejection failed, please verify the information and try again. Or contact us for more support at cse340@support.com")
      res.render("approval/approval-management",{
        title: "Inventory Approval Management",
        nav,
      })
    }
  }
  
  /* 
  Approve inventory process
  */
  approveCont.approveClassUpdate = async function (req, res) {
    const { classification_id, account_id } = req.body //Gets the values from the post request body

    const approveResult = await approveModel.approveClassification (classification_id, account_id ) //uses the approveModel.deleteInventory method to delete the vehicle from the database which returns a fufilled or failed promise 

    if (approveResult)  //if the promise was fufilled succesfully then creates a success flash message and uses the res.render function to return to the inventory management view 
    {
      req.flash("notice", `The classification has been approved successfully.`)
      res.redirect("/approve/")
    } else //If the promise fulfilled with a failure it creates a failure message and uses res.render fn to return to the delete inventory page.
    {
      let nav = await utilities.getNav()
      req.flash("notice", "Sorry, the approval failed, please verify the information and try again. Or contact us for more support at cse340@support.com")
      res.render("approval/approval-management",{
        title: "Inventory Approval Management",
        nav,
      })
    }
  }

module.exports = approveCont