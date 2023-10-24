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
// invCont.buildByInventoryId = async function (req, res, next) {
//   try{
//     const vehicleId = req.params.inv_id;
//     const vehicleData = await invModel.getVehicleByInventoryId(inv_id);
    
//     if(vehicleData){
//       res.status(404).send('Not found!');
//       return;
//       }
//     }
//     catch(error){
//       next(error);
//     }
//   }


// module.exports = invCont