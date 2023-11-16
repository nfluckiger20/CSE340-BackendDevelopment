// Account Route, Assignment 4 - Deliver login view
// Needed resources below
const express = require("express")
const router = new express.Router()
const accountController = require("../controllers/accountController")
const utilities = require("../utilities")
const { buildLogin } = require('../controllers/accountController');
const regValidate = require('../utilities/account-validation')

// Deliver login view
router.get("/login", utilities.handleErrors(accountController.buildLogin))

// Deliver registration view
router.get("/register", utilities.handleErrors(accountController.buildRegister))
// router.post('/register', utilities.handleErrors(accountController.registerAccount))

// Process the login request
router.post(
  "/login",
  regValidate.LoginRules(),
  regValidate.checkLogData,
  utilities.handleErrors(accountController.accountLogin)
)
  
// Process the registration data
router.post(
  "/register",
  regValidate.registrationRules,
  regValidate.checkRegData,
  utilities.handleErrors(accountController.registerAccount)
)

module.exports = router