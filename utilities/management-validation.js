// validate.LoginRules = () => {
//     return[
//       // valid email is required and cannot already exist in the DB
//       body("account_email")
//       .trim()
//       .isEmail()
//       .normalizeEmail() // refer to validator.js docs
//       .withMessage("A valid email is required.")
//       .custom(async (account_email) => {
//         const emailExists = await accountModel.checkExistingEmail(account_email)
//         if (!emailExists){
//           throw new Error("Email does not exists.")
//         }
//       }),

//       // password is required and must be strong password
//       body("account_password")
//         .trim()
//         .isStrongPassword({
//           minLength: 12,
//           minLowercase: 1,
//           minUppercase: 1,
//           minNumbers: 1,
//           minSymbols: 1,
//         })
//         .withMessage("Password does not meet requirements."),
    
// ]  }

// validate.checkLogData = async (req, res, next) => {
//   const { account_email } = req.body
//   let errors = []
//   errors = validationResult(req)
//   if (!errors.isEmpty()) {
//     let nav = await utilities.getNav()
//     res.render("account/login", {
//       errors,
//       title: "Login",
//       nav,
//       account_email,
//     })
//     return
//   }
//   next()
// }
   
// module.exports = validate;