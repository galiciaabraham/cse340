const express = require("express");
const router = new express.Router();
const invController = require("../controllers/invController");
const middleware = require("../utilities")
const addInvValidation = require("../utilities/add-inventory-validation")

//Default route
router.get("/",
    middleware.checkLogin,
    middleware.handleErrors(invController.buildManagement))

//Route to build inventory by classification view
router.get("/type/:classificationId", middleware.handleErrors(invController.buildByClassificationId))

//Route to build vehicle details by inventory Id view
router.get("/detail/:invId", middleware.handleErrors(invController.buildDetailsPage));

//Route to build management view
router.get("/management", 
middleware.checkLogin,
middleware.checkAccountType,
middleware.handleErrors(invController.buildManagement))

//Route to build the add classification view
router.get("/add-classification",
middleware.checkLogin,
middleware.checkAccountType, 
middleware.handleErrors(invController.buildAddClass))

//Route to build the add inventory view
router.get("/add-inventory",
middleware.checkLogin,
middleware.checkAccountType,
middleware.checkAccountType,middleware.handleErrors(invController.buildAddInv))

//Route to build the edition page
router.get("/edit/:invId", 
middleware.checkLogin,
middleware.checkAccountType,
middleware.handleErrors(invController.buildEditInv))

//Route to build the deletion confirmation page
router.get("/delete/:invId", 
middleware.checkLogin,
middleware.checkAccountType,
middleware.handleErrors(invController.buildDeleteInv))

//Route to build the approval management view
router.get("/approval",
middleware.checkLogin, 
middleware.checkAccountTypeAdmin,
middleware.handleErrors(invController.buildApproval))

//Route to get the confirm rejection view
router.get("/reject/:itemId/:type?",
    middleware.checkLogin, 
    middleware.checkAccountTypeAdmin,
    middleware.handleErrors(invController.buildRejectUpdate))

//Route to post the confirm approval view
router.get("/approve/:itemId/:type?",
    middleware.checkLogin, 
    middleware.checkAccountTypeAdmin,
    middleware.handleErrors(invController.buildApproveUpdate))

//Route to process the AJAX request to show the available items to edit
router.get("/getInventory/:classification_id",
middleware.handleErrors(invController.getInventoryJSON))

//Route to process the AJAX request to show the added items needing approval
router.get("/getApprovalList/:type?",
middleware.handleErrors(invController.getApprovalsList))

//Route to send a post request to the server to add a new classification
router.post(
    "/add-classification",
    addInvValidation.classAddRules(),
    addInvValidation.checkClassAddition,
    middleware.checkLogin,
    middleware.checkAccountType,
    middleware.handleErrors(invController.addClassification))

//Route to add new inventory using a post request
router.post(
        "/add-inventory",
        addInvValidation.invAddRules(),
        addInvValidation.checkInvAddition,
        middleware.checkLogin,
        middleware.checkAccountType,
        middleware.handleErrors(invController.addInventory))

//Route to update inventory using a post request    
router.post(
    "/update/", 
    addInvValidation.invAddRules(),
    addInvValidation.checkInvUpdate,
    middleware.checkLogin,
    middleware.checkAccountType,
    middleware.handleErrors (invController.updateInventory)
)

//Route to delete inventory using a post request
router.post(
    "/delete/", 
    middleware.checkLogin,
    middleware.checkAccountType,
    middleware.handleErrors(invController.deleteInventory))

module.exports = router;
