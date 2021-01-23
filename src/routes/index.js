const route = require('express').Router()
const routeAdmin = require('./AdminRoute')
const CustomerRoutes = require('./UserRoute')

route.use('/admin', routeAdmin)
route.use("/customer", CustomerRoutes)

module.exports = route