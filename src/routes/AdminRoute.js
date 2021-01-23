const routeAdmin = require('express').Router()
const AdminController = require('../controllers/AdminController')

routeAdmin.post('/register', AdminController.registerAdmin);

module.exports = routeAdmin