const express = require('express')
const route = express.Router()
const ControllerUser = require('../controllers/UserController')

route.post("/register", ControllerUser.registerCustomer)
route.post("/login", ControllerUser.loginRegister)

module.exports = route