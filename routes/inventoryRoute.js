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

// Display inventory view
router.get("/addInventory", invController.buildNewInventory);
router.post("/addClassification", validate.classifcationRules(), validate.checkInvData, utilities.handleErrors(invController.newInventory));

// Assignment 3 inventory route
router.get("/detail/:inv_id", utilities.handleErrors(invController.buildByInventoryId));
router.get("/addInventory", invController.buildNewInventory);

// Deliver managment view
router.get("/", utilities.handleErrors(invController.buildInvManage));

// Table in the management view
router.get("/getInventory/:classification_id", utilities.handleErrors(invController.getInventoryJSON))

module.exports = router;