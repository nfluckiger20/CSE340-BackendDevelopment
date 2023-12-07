const invModel = require("../models/inventory-model")
const Util = {}
const jwt = require("jsonwebtoken")
require("dotenv").config()

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
Util.handleErrors = fn => (req, res, next) => Promise.resolve(fn(req, res, next)).catch(next);


/* **************************************
* Build the inventory view HTML
* ************************************ */
 Util.buildInventoryGrid= async function (vehicleData) {
  //  Make sure vehicleData contains the correct data: make, model, year, price, mileage 
   if (!vehicleData || typeof vehicleData !== 'object') {
      return '<p>No vehicle found.</p>';
}

// HTML connection to vehicle information
const html = `
  <div class="vehicle">
    <h2>${vehicleData.inv_make} ${vehicleData.inv_model}</h2>
    <h2 class="price">Price: ${new Intl.NumberFormat('en-US').format(vehicleData.inv_price)}</h2>
    <img src=${vehicleData.inv_image}></img>
    <p class="year">Year: ${vehicleData.inv_year}</p>
    <p class="color">Color: ${vehicleData.inv_color}</p>
    <p class="mileage">Mileage: ${new Intl.NumberFormat('en-US').format(vehicleData.inv_mileage)}</p>
  </div>
`;

return html;
}

// Get inventory
Util.getInventoryGrid = async function(inv_id){
  let data = await invModel.getInventoryById(inv_id);
  let detailView = await utilities.buildInventoryGrid(data);
  return {data,detailView};
}

// Get Dropdown for add inventory
Util.getDropdown = async function(data, classification_id){
  let container = '<select name="classification_id" id="class-dropdown">'
  container += '<option value="">Select a Classification</option>'
  for (let i = 0; i < data.length; i++) {
    console.log(classification_id)
    container += `<option value="${data[i].classification_id}"
    ${classification_id === Number(data[i].classification_id)? 'selected': ''}
    > 
    ${data[i].classification_name}</option>`;
  }
  
  container += `</select>`
  return container

}

/* ****************************************
* Middleware to check token validity
**************************************** */
Util.checkJWTToken = (req, res, next) => {
  res.locals.loggedin = false;
  if (req.cookies.jwt) {
   jwt.verify(
    req.cookies.jwt,
    process.env.ACCESS_TOKEN_SECRET,
    function (err, accountData) {
     if (err) {
      req.flash("Please log in")
      res.clearCookie("jwt")
      return res.redirect("/account/login")
     }
     res.locals.accountData = accountData
     res.locals.loggedin = true
     next()
    })
  } else {
   next()
  }
 }

/* ****************************************
 *  Check Login
 * ************************************ */
Util.checkLogin = (req, res, next) => {
  if (res.locals.loggedin) {
    next()
  } else {
    req.flash("notice", "Please log in.")
    return res.redirect("/account/login")
  }
 }

//  Assignment 5 Task 2: Midelware to check account type
 Util.checkAccountType = (req, res, next) => {
  const account_type = res.locals.accountData.account_type
  if(account_type === 'Employee' || account_type === 'Admin'){
    next()
  } else {
    req.flash('Notice', `You do not have access to this page.`)
    res.redirect("/account/login")
  }
}

module.exports = Util