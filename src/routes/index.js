const route = require('express').Router()
const routeAdmin = require('./AdminRoute');
const routeOrganizer = require('./OrganizerRoute');

route.use('/admin', routeAdmin);

route.use('/organizers', routeOrganizer);

module.exports = route