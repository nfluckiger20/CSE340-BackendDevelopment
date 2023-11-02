// Account Route, Assignment 4 - Deliver login view
// Needed resources below
const express = require("express")
const router = new express.Router()
const accountController = require("../controllers/accountController")
const utilities = require("../utilities")

// Deliver login view
router.get("/login", utilities.handleErrors(accountController.buildLogin))

// Deliver registration view
router.get("/register", utilities.handleErrors(accountController.buildRegister))
// router.post('/register', utilities.handleErrors(accountController.registerAccount))

router.get('/', buildLogin);
router.use(errorHandler);

module.exports = router