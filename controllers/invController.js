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
 *  Build inventory: Assignment 3
 * ************************** */
invCont.buildByInventoryId = async function (req, res, next) {
  try{
    const inv_id = req.params.inv_id;
    const vehicleData = await invModel.getVehicleByInventoryId(inv_id);
    
    if(!vehicleData){
      res.status(404).send('Not found!');
      return;
      }

    const grid = await utilities.buildInventoryGrid(vehicleData); 
    let nav = await utilities.getNav()
    const title = vehicleData.inv_make + ' ' + vehicleData.inv_model;
  
    res.send("You have data", {
      title: className + " vehicles",
      nav,
      grid,
    })

    }
    catch(error){
      next(error);
    }
  }


module.exports = invCont