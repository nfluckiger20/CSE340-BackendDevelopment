const utilities = require("../utilities")
const baseController = {}

baseController.buildHome = async function(req, res){
  const nav = await utilities.getNav()
  const loggedin = res.locals.loggedin
  res.render("index", {title: "Home", nav, loggedin})
}

module.exports = baseController;