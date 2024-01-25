const express = require("express");
const router = new express.Router();
const invController = require("../controllers/invController");
const middleware = require("../utilities")

//Route to build inventory by classification view
router.get("/type/:classificationId", middleware.handleErrors(invController.buildByClassificationId));
router.get("/detail/:invId", middleware.handleErrors(invController.buildDetailsPage));

module.exports = router;
