const route = require('express').Router()
const routeAdmin = require('./AdminRoute')

route.use('/admin', routeAdmin)

module.exports = route