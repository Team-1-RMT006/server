const route = require('express').Router()

const routeAdmin = require('./AdminRoute')
const CustomerRoutes = require('./UserRoute')
const routeOrganizer = require('./OrganizerRoute');

route.use('/admin', routeAdmin)
route.use("/customer", CustomerRoutes)
route.use('/organizers', routeOrganizer);

module.exports = route