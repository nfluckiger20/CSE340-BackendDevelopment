// Needed Resources 
const express = require("express")
const router = new express.Router() 
const invController = require("../controllers/invController")
const utilities = require("../utilities/index")
const validate = require("../utilities/management-validation")

// Route to build inventory by classification view
router.get("/type/:classificationId", utilities.handleErrors(invController.buildByClassificationId));

// Display classification view
router.get("/addClassification", invController.buildNewClassification);
router.post("/addClassification", validate.classifcationRules(), validate.checkClassificationData, utilities.handleErrors(invController.newClassification));

// Assignment 3 inventory route
router.get("/detail/:inv_id", utilities.handleErrors(invController.buildByInventoryId));
router.get("/addInventory", invController.buildNewInventory);

// Deliver managment view
router.get("/", utilities.handleErrors(invController.buildInvManage));

module.exports = router;