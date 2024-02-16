const express = require("express");
const router = new express.Router();
const invController = require("../controllers/invController");
const utilities = require("../utilities")
const addInvValidation = require("../utilities/add-inventory-validation")

//Default route
router.get("/",
    utilities.checkLogin,
    utilities.handleErrors(invController.buildManagement))

//Route to build inventory by classification view
router.get("/type/:classificationId", utilities.handleErrors(invController.buildByClassificationId))

//Route to build vehicle details by inventory Id view
router.get("/detail/:invId", utilities.handleErrors(invController.buildDetailsPage));

//Route to build management view
router.get("/management", 
utilities.checkLogin,
utilities.checkAccountType,
utilities.handleErrors(invController.buildManagement))

//Route to build the add classification view
router.get("/add-classification",
utilities.checkLogin,
utilities.checkAccountType, 
utilities.handleErrors(invController.buildAddClass))

//Route to build the add inventory view
router.get("/add-inventory",
utilities.checkLogin,
utilities.checkAccountType,
utilities.checkAccountType,utilities.handleErrors(invController.buildAddInv))

//Route to build the edition page
router.get("/edit/:invId", 
utilities.checkLogin,
utilities.checkAccountType,
utilities.handleErrors(invController.buildEditInv))

//Route to build the deletion confirmation page
router.get("/delete/:invId", 
utilities.checkLogin,
utilities.checkAccountType,
utilities.handleErrors(invController.buildDeleteInv))

//Route to process the AJAX request to show the available items to edit
router.get("/getInventory/:classification_id",
utilities.handleErrors(invController.getInventoryJSON))

//Route to send a post request to the server to add a new classification
router.post(
    "/add-classification",
    addInvValidation.classAddRules(),
    addInvValidation.checkClassAddition,
    utilities.checkLogin,
    utilities.checkAccountType,
    utilities.handleErrors(invController.addClassification))

//Route to add new inventory using a post request
router.post(
        "/add-inventory",
        addInvValidation.invAddRules(),
        addInvValidation.checkInvAddition,
        utilities.checkLogin,
        utilities.checkAccountType,
        utilities.handleErrors(invController.addInventory))

//Route to update inventory using a post request    
router.post(
    "/update/", 
    addInvValidation.invAddRules(),
    addInvValidation.checkInvUpdate,
    utilities.checkLogin,
    utilities.checkAccountType,
    utilities.handleErrors (invController.updateInventory)
)

//Route to delete inventory using a post request
router.post(
    "/delete/", 
    utilities.checkLogin,
    utilities.checkAccountType,
    utilities.handleErrors(invController.deleteInventory))

module.exports = router;
