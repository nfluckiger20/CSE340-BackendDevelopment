const invModel = require("../models/inventory-model")
const utilities = require("../utilities/")
const invCont = {}

/* ***************************
 *  Build inventory by classification view
 * ************************** */
invCont.buildByClassificationId = async function (req, res, next) {
  const classification_id = req.params.classificationId
  const data = await invModel.getInventoryByClassificationId(classification_id)
  const grid = await utilities.buildClassificationGrid(data)
  let nav = await utilities.getNav()
  const className = data[0].classification_name
  res.render("./inventory/classification", {
    title: className + " vehicles",
    nav,
    grid,
  })
}


/* ***************************
 *  Build inventorybyId
 * ************************** */
invCont.buildByInventoryId = async function (req, res, next) {
  try{
    const inv_id = req.params.inv_id;
    const vehicleData = await invModel.getInventoryById(inv_id);
    
    if(!vehicleData){
      res.status(404).send('Not found!');
      return;
      }

    const grid = await utilities.buildInventoryGrid(vehicleData); 
    let nav = await utilities.getNav()
    const title = vehicleData.inv_make + ' ' + vehicleData.inv_model;
  
    res.render("./inventory/detail", {
      title: title,
      nav,
      grid,
    })

    }
    catch(error){
      next(error);
    }
  }

// Build the inventory management view
invCont.buildInvManage = async function (req,res,next) {
  let nav = await utilities.getNav()
  const table = await invModel.getClassifications()
  let dropmenu = await utilities.getDropmenu(table)
  res.render("./inventory/management", {
    title: "Manage Vehicles",
    nav,
    errors: null,
    dropmenu,
    message:null,
  })
}

//   Build view for adding classification
invCont.buildNewClassification = async function (req,res,next) {
  let nav = await utilities.getNav()
  res.render("./inventory/addClassification", {
    title: "New Classification",
    nav,
    errors: null,
  })
}

  // Process New Classification
invCont.newClassification = async function(req,res){
  const {classification_name} = req.body

  const regResult = await invModel.newClassification(
    classification_name
  )

  if (regResult) {
    let nav = await utilities.getNav()
    req.flash(
      "Success",
      `You've succesfully added ${classification_name}!`
    )
    res.status(201).render("inventory/management", {
      title: "Manage Vehicles",
      nav,
      errors:null,
    })
  } else {
    req.flash("error", 
    "Unsuccesful classificaiton."
    )
    res.status(501).render("inventory/addClassification", {
      title: "New Classification",
      nav,
    })
  }
}

module.exports = invCont;