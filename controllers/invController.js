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
  const dropdown = await utilities.getDropdown(table.rows)
  res.render("./inventory/management", {
    title: "Manage Vehicles",
    nav,
    errors: null,
    message:null,
    dropdown,
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

  // Process Add New Classification
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
      errors: null
    })
  }
}

//   Build view for adding inventory
invCont.buildNewInventory = async function (req,res,next) {
  let nav = await utilities.getNav()
  const table = await invModel.getClassifications()
  const dropdown = await utilities.getDropdown(table.rows)
  res.render("./inventory/addInventory", {
    title: "New Inventory",
    nav,
    errors: null,
    dropdown,
  })
}

  // Process Add New Inventory
invCont.newInventory = async function(req,res){
  const {new_inv} = req.body

  const regResult = await invModel.newInventory(
    new_inv
  )

  if (regResult) {
    let nav = await utilities.getNav()
    req.flash(
      "Success",
      `You've succesfully added ${new_inv}!`
    )
    res.status(201).render("inventory/management", {
      title: "Manage Vehicles",
      nav,
      errors:null,
    })
  } else {
    req.flash("error", 
    "Inventory not found."
    )
    res.status(501).render("inventory/addInventory", {
      title: "New Inventory",
      nav,
    })
  }
}

/* ***************************
 *  Return Inventory by Classification As JSON
 * ************************** */
invCont.getInventoryJSON = async (req, res, next) => {
  const classification_id = parseInt(req.params.classification_id)
  const invData = await invModel.getInventoryByClassificationId(classification_id)
  if (invData[0].inv_id) {
    return res.json(invData)
  } else {
    next(new Error("No data returned"))
  }
}

/* ***************************
 *  Build edit inventory view
 * ************************** */
invCont.editInventory = async function (req, res, next) {
  const inv_id = parseInt(req.params.inv_id)
  let nav = await utilities.getNav()
  const itemData = await invModel.getInventoryById(inv_id)
  const table = await invModel.getClassifications()
  const dropdown = await utilities.getDropdown(table.rows)  
  const itemName = `${itemData[0].inv_make} ${itemData[0].inv_model}`
  res.render("./inventory/editInventory", {
    title: "Edit " + itemName,
    nav,
    dropdown,
    errors: null,
    inv_id: itemData.inv_id,
    inv_make: itemData.inv_make,
    inv_model: itemData.inv_model,
    inv_year: itemData.inv_year,
    inv_description: itemData.inv_description,
    inv_image: itemData.inv_image,
    inv_thumbnail: itemData.inv_thumbnail,
    inv_price: itemData.inv_price,
    inv_miles: itemData.inv_miles,
    inv_color: itemData.inv_color,
    classification_id: itemData.classification_id
  })
}

/* ***************************
 *  Update Inventory Data
 * ************************** */
invCont.updateInventory = async function (req, res, next) {
  let nav = await utilities.getNav()
  const table = await invModel.getClassifications()
  const dropdown = await utilities.getDropdown(table.rows,  invData[0].classification_id)
  const {
    inv_id,
    inv_make,
    inv_model,
    inv_description,
    inv_image,
    inv_thumbnail,
    inv_price,
    inv_year,
    inv_miles,
    inv_color,
    classification_id,
  } = req.body
  
  const updateResult = await invModel.updateInventory(
    inv_id,  
    inv_make,
    inv_model,
    inv_description,
    inv_image,
    inv_thumbnail,
    inv_price,
    inv_year,
    inv_miles,
    inv_color,
    classification_id
  )

  if (updateResult) {
    const itemName = updateResult.inv_make + " " + updateResult.inv_model
    req.flash("notice", `The ${itemName} was successfully updated.`)
    // res.redirect("/inv/")
  } else {
    const itemName = `${inv_make} ${inv_model}`
    req.flash("notice", "Sorry, the insert failed.")
    res.status(501).render("inventory/editinventory", {
    title: "Edit " + itemName,
    nav,
    dropdown,
    errors: null,
    inv_id,
    inv_make,
    inv_model,
    inv_year,
    inv_description,
    inv_image,
    inv_thumbnail,
    inv_price,
    inv_miles,
    inv_color,
    classification_id
    })
  }
}


// actually delete info and give confirmation
invCont.deleteInventoryCheck = async function(req, res){
  let nav = await utilities.getNav()
  const inv_id = parseInt(req.params.inv_id)
  const invData = await invModel.getInventoryById(inv_id)
  const itemName = `${invData[0].inv_make} ${invData[0].inv_model}`
  res.render("./inventory/delete-confirm", {
    title: "Delete " + itemName,
    nav,
    errors: null,
    inv_id: invData.inv_id,
    inv_make: invData.inv_make,
    inv_model: invData.inv_model,
    inv_year: invData.inv_year,
    inv_price: invData.inv_price,
  })
}

// deliver delete confirmation 
invCont.deleteInventoryForReal = async function(req, res){
  let nav = await utilities.getNav()

  const {
    inv_id,
    inv_make,
    inv_model,
    inv_description,
    inv_image,
    inv_thumbnail,
    inv_price,
    inv_year,
    inv_miles,
    inv_color,
    classification_id,
    
  }  = req.body


  const dataResult = await invModel.deleteInventoryItem(
    inv_id,
    inv_make,
    inv_model,
    inv_description,
    inv_image,
    inv_thumbnail,
    inv_price,
    inv_year,
    inv_miles,
    inv_color,
    classification_id, 
  )

  if (dataResult) {
    const itemName = inv_make + " " + inv_model
    req.flash("success", `The ${itemName} was deleted.`)
    res.redirect("/inv/")
  } else {
    const itemName = `${inv_make} ${inv_model}`
    req.flash("notice", "Sorry, the deletion failed.")
    res.status(501).render("inventory/delete-confirm", {
    title: "Delete " + itemName,
    nav,
    dropdown: classificationSelect,
    errors: null,
    inv_id,
    inv_make,
    inv_model,
    inv_year,
    inv_description,
    inv_image,
    inv_thumbnail,
    inv_price,
    inv_miles,
    inv_color,
    classification_id
    })
  }
}

module.exports = invCont;