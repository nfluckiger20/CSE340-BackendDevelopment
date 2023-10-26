// Needed Resources 
const express = require("express")
const router = new express.Router() 
const invController = require("../controllers/invController")
const utilities = require("../utilities/index")

// Route to build inventory by classification view
router.get("/type/:classificationId", utilities.handleErrors(invController.buildByClassificationId));

// Assignment 3 inventory route
router.get("/detail/:inv_id", utilities.handleErrors(invController.buildByInventoryId));

module.exports = router;