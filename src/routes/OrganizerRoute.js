const routeOrganizer = require('express').Router();
const OrganizerController = require('../controllers/OrganizerController');
const organizerAuthentication = require('../middlewares/organizerAuthentication');
const eventAuthorization = require('../middlewares/eventAuthorization');

routeOrganizer.post('/register', OrganizerController.registerOrganizer);
routeOrganizer.post('/login', OrganizerController.loginOrganizer);

routeOrganizer.use(organizerAuthentication);
routeOrganizer.get("/profile", OrganizerController.getProfile);
routeOrganizer.get("/events", OrganizerController.showEvents);
routeOrganizer.post("/events", OrganizerController.createEvent);

routeOrganizer.use(eventAuthorization);
routeOrganizer.put("/events/:id", OrganizerController.updateEvent);
routeOrganizer.delete("/events/:id", OrganizerController.deleteEvent);

module.exports = routeOrganizer;