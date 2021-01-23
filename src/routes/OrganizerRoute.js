const routeOrganizer = require('express').Router();
const OrganizerController = require('../controllers/OrganizerController');
const organizerAuthentication = require('../middlewares/organizerAuthentication');

routeOrganizer.post('/register', OrganizerController.registerOrganizer);
routeOrganizer.post('/login', OrganizerController.loginOrganizer);

routeOrganizer.use(organizerAuthentication);
routeOrganizer.get("/profile", OrganizerController.getProfile);

module.exports = routeOrganizer;