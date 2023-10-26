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
    const vehicleData = await invModel.getVehicleByInventoryId(inv_id);
    
    if(!vehicleData){
      res.status(404).send('Not found!');
      return;
      }

    const grid = await utilities.buildInventoryGrid(vehicleData); 
    let nav = await utilities.getNav()
    const title = vehicleData[0].inv_make + ' ' + vehicleData[0].inv_model;
  
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

  // error from route code: "throw new error"

module.exports = invCont