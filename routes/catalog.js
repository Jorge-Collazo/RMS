var express = require('express');
var router = express.Router();

// Require controller modules.
var incident_controller = require('../controllers/incidentController');
var people_controller = require('../controllers/peopleController');
var vehicle_controller = require('../controllers/vhicleController');

/// incident ROUTES ///

// GET catalog home page.
router.get('/', incident_controller.index);

// GET request for creating a incident. NOTE This must come before routes that display incident (uses id).
router.get('/incident/create', incident_controller.incident_create_get);

// POST request for creating incident.
router.post('/incident/create', incident_controller.incident_create_post);

// GET request to delete incident.
router.get('/incident/:id/delete', incident_controller.incident_delete_get);

// POST request to delete incident.
router.post('/incident/:id/delete', incident_controller.incident_delete_post);

// GET request to update incident.
router.get('/incident/:id/update', incident_controller.incident_update_get);

// POST request to update incident.
router.post('/incident/:id/update', incident_controller.incident_update_post);

// GET request for one incident.
router.get('/incident/:id', incident_controller.incident_detail);

// GET request for list of all incident items.
router.get('/incidents', incident_controller.incident_list);

/// people ROUTES ///

// GET request for creating people. NOTE This must come before route for id (i.e. display people).
router.get('/people/create', people_controller.people_create_get);

// POST request for creating people.
router.post('/people/create', people_controller.people_create_post);

// GET request to delete people.
router.get('/people/:id/delete', people_controller.people_delete_get);

// POST request to delete people.
router.post('/people/:id/delete', people_controller.people_delete_post);

// GET request to update people.
router.get('/people/:id/update', people_controller.people_update_get);

// POST request to update people.
router.post('/people/:id/update', people_controller.people_update_post);

// GET request for one people.
router.get('/people/:id', people_controller.people_detail);

// GET request for list of all peoples.
router.get('/peoples', people_controller.people_list);

/// vhicle ROUTES ///

// GET request for creating a vhicle. NOTE This must come before route that displays vhicle (uses id).
router.get('/vhicle/create', vehicle_controller.vehicle_create_get);

//POST request for creating vhicle.
router.post('/vhicle/create', vehicle_controller.vehicle_create_post);

// GET request to delete vhicle.
router.get('/vhicle/:id/delete', vehicle_controller.vehicle_delete_get);

// POST request to delete vhicle.
router.post('/vhicle/:id/delete', vehicle_controller.vehicle_delete_post);

// GET request to update vhicle.
router.get('/vhicle/:id/update', vehicle_controller.vehicle_update_get);

// POST request to update vhicle.
router.post('/vhicle/:id/update', vehicle_controller.vehicle_update_post);

// GET request for one vhicle.
router.get('/vhicle/:id', vehicle_controller.vehicle_detail);

// GET request for list of all vhicle.
router.get('/vhicles', vehicle_controller.vehicle_list);

module.exports = router;
