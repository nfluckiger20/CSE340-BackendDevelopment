const utilities = require(".")
const { body, validationResult } = require("express-validator")
const validate = {}
const accountModel = require("../models/account-model")


validate.classifcationRules = () => {
  return [
    body("classification_name")
      .isLength({ min: 3})
      .withMessage("Please provide a valid classification name.")
  ]
}

validate.checkClassificationData = async (req, res, next) => {
  const {classification_name } = req.body;
  let errors = [];
  errors = validationResult(req);
  if (!errors.isEmpty()){
    res.render("./inventory/addClassification", {
      errors,
      title: "New Classification",
      nav,
      classification_name
    });
    return;
  }
  next();
}

validate.invRules = () => {
  return [
    body("inv_make")
      .isLength({ min: 3 })
      .withMessage("Please provide a valid inventory make."),
    
    body("inv_model")
      .isLength({ min: 3 })
      .withMessage("Please provide a valid inventory model."),

    body("inv_price")
      .isNumeric()
      .withMessage("Please provide a numeric inventory price."),

    body("inv_image")
      .isLength({ min: 1 }) 
      .withMessage("Incorrect file type. Please replace with png, jpg,or jpeg."),

    body("inv_thumbnail")
      .isLength({ min: 1 }) 
      .withMessage("Incorrect file type. Please replace with png, jpg,or jpeg."),

    body("inv_year")
      .isInt({ min: 1900, max: new Date().getFullYear() })
      .withMessage("Please provide a valid inventory year."),

    body("inv_mileage")
      .isNumeric()
      .withMessage("Please provide a numeric inventory mileage."),

    body("inv_color")
      .isLength({ min: 3 })
      .withMessage("Please provide a valid inventory color.")
  ];
};


validate.checkInvData = async (req, res, next) => {
  const { inv_make, inv_model, inv_price, inv_image, inv_thumbnail, inv_year, inv_mileage, inv_color } = req.body;
  let errors = validationResult(req);

  if (!errors.isEmpty()) {
    res.render("./inventory/addInventory", {
      errors,
      title: "New Inventory",
      nav, 
      inv_make,
      inv_model,
      inv_price,
      inv_image,
      inv_thumbnail,
      inv_year,
      inv_mileage,
      inv_color
    });
    return;
  }

  next();
};

   
module.exports = validate;