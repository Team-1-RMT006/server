const routeAdmin = require('express').Router()
const AdminController = require('../controllers/AdminController')
const authentication = require('../middlewares/authentication')

routeAdmin.post('/register', AdminController.registerAdmin)
routeAdmin.post('/login', AdminController.loginAdmin)
routeAdmin.get('/banner', AdminController.getBanner)
routeAdmin.use(authentication)
routeAdmin.post('/event', AdminController.createEvent)
routeAdmin.get('/event', AdminController.getEvent)
routeAdmin.get('/organizers', AdminController.getOrganizers)
routeAdmin.put('/event/:id', AdminController.editEvent)
routeAdmin.get('/event/:id', AdminController.getEventById)
routeAdmin.delete('/event/:id', AdminController.deleteEvent)
routeAdmin.post('/banner', AdminController.createBanner)
routeAdmin.put('/banner/:id', AdminController.editBanner)
routeAdmin.delete('/banner/:id', AdminController.deleteBanner)
routeAdmin.get('/banner/:id', AdminController.getBannerById)
routeAdmin.post('/eventType', AdminController.createEventType)
routeAdmin.get('/eventType', AdminController.getEventType)
routeAdmin.put('/eventType/:id', AdminController.editEventType)
routeAdmin.delete('/eventType/:id', AdminController.deleteEventType)
routeAdmin.get('/eventType/:id', AdminController.getEventTypeById)



module.exports = routeAdmin