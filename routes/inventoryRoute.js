const express = require("express");
const router = new express.Router();
const invController = require("../controllers/invController");
const middleware = require("../utilities")
const addInvValidation = require("../utilities/add-inventory-validation")

//Route to build inventory by classification view
router.get("/type/:classificationId", middleware.handleErrors(invController.buildByClassificationId));
//Route to build vehicle details by inventory Id view
router.get("/detail/:invId", middleware.handleErrors(invController.buildDetailsPage));
//Route to build management view
router.get("/management", middleware.handleErrors(invController.buildManagement))

//Route to build the add classification view
router.get("/add-classification", middleware.handleErrors(invController.buildAddClass))

//Route to send a post request to the server to add a new classification
router.post(
    "/add-classification",
    addInvValidation.classAddRules(),
    addInvValidation.checkClassAddition,
    middleware.handleErrors(invController.addClassification))


module.exports = router;
