const routeAdmin = require('express').Router()
const AdminController = require('../controllers/AdminController')
const authentication = require('../middlewares/authentication')

routeAdmin.post('/register', AdminController.registerAdmin)
routeAdmin.post('/login', AdminController.loginAdmin)
routeAdmin.use(authentication)
routeAdmin.post('/event', AdminController.createEvent)

module.exports = routeAdmin