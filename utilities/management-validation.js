const utilities = require(".")
const { body, validationResult } = require("express-validator")
const validate = {}
const accountModel = require("../models/account-model")

validate.InvRules = () => {
    return[
      body("inv_make")
      .trim()
      .isMake()
      .normalizeMake() // refer to validator.js docs
      .withMessage("A valid vehicle is required.")
      .custom(async (inv_make) => {
        const vehicleExists = await accountModel.checkExistingMake(inv_make)
        if (!vehicleExists){
          throw new Error("Vehicle make does not exists.")
        }
      }), 
]  }

validate.checkInvData = async (req, res, next) => {
  const { inv_make } = req.body
  let errors = []
  errors = validationResult(req)
  if (!errors.isMake()) {
    let nav = await utilities.getNav()
    res.render("inventory/addInventory", {
      errors,
      title: "Vehicle Make",
      nav,
      inv_make,
    })
    return
  }
  next()
}
   
module.exports = validate;