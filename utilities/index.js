const invModel = require("../models/inventory-model")
const Util = {}

/* ************************
 * Constructs the nav HTML unordered list
 ************************** */
Util.getNav = async function (req, res, next) {
  let data = await invModel.getClassifications()
  let list = "<ul>"
  list += '<li><a href="/" title="Home page">Home</a></li>'
  data.rows.forEach((row) => {
    list += "<li>"
    list +=
      '<a href="/inv/type/' +
      row.classification_id +
      '" title="See our inventory of ' +
      row.classification_name +
      ' vehicles">' +
      row.classification_name +
      "</a>"
    list += "</li>"
  })
  list += "</ul>"
  return list
}

module.exports = Util

/* **************************************
* Build the classification view HTML
* ************************************ */
Util.buildClassificationGrid = async function(data){
    let grid
    if(data.length > 0){
      grid = '<ul id="inv-display">'
      data.forEach(vehicle => { 
        grid += '<li>'
        grid +=  '<a href="../../inv/detail/'+ vehicle.inv_id 
        + '" title="View ' + vehicle.inv_make + ' '+ vehicle.inv_model 
        + 'details"><img src="' + vehicle.inv_thumbnail 
        +'" alt="Image of '+ vehicle.inv_make + ' ' + vehicle.inv_model 
        +' on CSE Motors" /></a>'
        grid += '<div class="namePrice">'
        grid += '<hr />'
        grid += '<h2>'
        grid += '<a href="../../inv/detail/' + vehicle.inv_id +'" title="View ' 
        + vehicle.inv_make + ' ' + vehicle.inv_model + ' details">' 
        + vehicle.inv_make + ' ' + vehicle.inv_model + '</a>'
        grid += '</h2>'
        grid += '<span>$' 
        + new Intl.NumberFormat('en-US').format(vehicle.inv_price) + '</span>'
        grid += '</div>'
        grid += '</li>'
      })
      grid += '</ul>'
    } else { 
      grid += '<p class="notice">Sorry, no matching vehicles could be found.</p>'
    }
    return grid
  }

  /* ****************************************
 * Middleware For Handling Errors
 * Wrap other function in this for 
 * General Error Handling
 **************************************** */
Util.handleErrors = fn => (req, res, next) => Promise.resolve(fn(req, res, next)).catch(next)


/* **************************************
* Build the inventory view HTML
* ************************************ */
function buildInventoryGrid(vehicleData){
 // Make sure vehicleData contains the correct data: make, model, year, price, mileage 
 if (!vehicleData || typeof vehicleData !== 'object') {
  return '<p>No vehicle found.</p>';
}

// HTML connection to vehicle information
const html = `
  <div class="vehicle">
    <h2>${vehicleData.make} ${vehicleData.model}</h2>
    <h3>Color: ${vehicleData.price}</h3>
    <p>Year: ${vehicleData.year}</p>
    <p>Color: ${vehicleData.color}</p>
    <p>Color: ${vehicleData.mileage}</p>
  </div>
`;

return html;
}

module.exports = {
buildInventoryGrid
}

invModel.getVehicleByInventoryId = async function (req, res, next) {
  const vehicleData = {
    make: "Toyota",
    model: "Camry",
    price: "$5,000",
    year: 2022,
    color: "Silver",
    mileage: "80,000"
  };
  
  const vehicleHTML = buildInventoryGrid(vehicleData);
  document.getElementById("vehicle").innerHTML = vehicleHTML;
  }
