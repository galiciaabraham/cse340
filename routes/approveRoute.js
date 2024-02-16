const express = require("express");
const router = express.Router();
const approveController = require ("../controllers/approveController");
const utilities = require("../utilities")

//Default route
router.get('/',
    utilities.checkLogin,
    utilities.checkAccountTypeAdmin,
    utilities.handleErrors(approveController.buildApprovalManagement))

//Route to build the approval management view
router.get("/management",
utilities.checkLogin, 
utilities.checkAccountTypeAdmin,
utilities.handleErrors(approveController.buildApprovalManagement))

//Route to get the confirm rejection view
router.get("/reject/:itemId/:type?",
    utilities.checkLogin, 
    utilities.checkAccountTypeAdmin,
    utilities.handleErrors(approveController.buildRejectUpdate))

//Route to post the confirm approval view
router.get("/approve/:itemId/:type?",
    utilities.checkLogin, 
    utilities.checkAccountTypeAdmin,
    utilities.handleErrors(approveController.buildApproveUpdate))

//Route to process the AJAX request to show the added items needing approval
router.get("/getApprovalList/:type?",
utilities.handleErrors(approveController.getApprovalsList))

//Route to reject inventory addition using a POST request
router.post(
    "/confirm/reject-inv/",
    utilities.checkLogin,
    utilities.checkAccountTypeAdmin,
    utilities.handleErrors(approveController.rejectInvUpdate)
)

//Route to reject classification addition using a POST request
router.post(
    "/confirm/reject-class/",
    utilities.checkLogin,
    utilities.checkAccountTypeAdmin,
    utilities.handleErrors(approveController.rejectClassUpdate)
)

//Route to approve inventory addition using a POST request
router.post(
    "/confirm/approve-inv/",
    utilities.checkLogin,
    utilities.checkAccountTypeAdmin,
    utilities.handleErrors(approveController.approveInvUpdate)
)

//Route to approve classification addition using a POST request
router.post(
    "/confirm/approve-class/",
    utilities.checkLogin,
    utilities.checkAccountTypeAdmin,
    utilities.handleErrors(approveController.approveClassUpdate)
)

module.exports = router