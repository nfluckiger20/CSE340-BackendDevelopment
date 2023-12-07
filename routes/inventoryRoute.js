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

// Deliver managment view (Assignment 5: Account Type)
router.get("/", 
// utilities.checkAccountType,
utilities.handleErrors(invController.buildInvManage));

// Table in the management view
router.get("/getInventory/:classification_id", utilities.handleErrors(invController.getInventoryJSON))

// Route for inventory management - update/edit vehicle information (Activity 5)
router.get("/editInventory/:inv_id", 
utilities.handleErrors(invController.editInventory))

router.post(
    "/update/", 
    validate.invRules(),
    validate.checkUpdateData,
    utilities.handleErrors((invController.updateInventory)))


    // delete vehicle from db confirmation view route
router.get("/delete/:inv_id", utilities.handleErrors((invController.deleteInventoryCheck)))

// delete vehicle from db
router.post("/goneForever", utilities.handleErrors((invController.deleteInventoryForReal)))

module.exports = router;