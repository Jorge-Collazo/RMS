var Vehicle = require('../models/vehicle');
var async = require('async');
var Incident = require('../models/incident');
var People = require('../models/people');

const { body,validationResult } = require('express-validator');

// Display list of all Vehicles.
exports.vehicle_list = function (req, res, next) {

    Vehicle.find()
        .sort([['family_name', 'ascending']])
        .exec(function (err, list_vehicles) {
            if (err) { return next(err); }
            //Successful, so render
            res.render('vehicle_list', { title: 'Vehicle List', vehicle_list: list_vehicle });
        });

};

// Display detail page for a specific vehicle.
exports.vehicle_detail = function (req, res, next) {

    async.parallel({
        vehicle: function (callback) {
            Vehicle.findById(req.params.id)
                .exec(callback)
        },
        vehicles_people: function (callback) {
            people.find({ 'vehicle': req.params.id }, 'title summary')
                .exec(callback)
        },
    }, function (err, results) {
        if (err) { return next(err); } // Error in API usage.
        if (results.vehicle == null) { // No results.
            var err = new Error('vehicle not found');
            err.status = 404;
            return next(err);
        }
        // Successful, so render.
        res.render('vehicle_detail', { title: 'Vehicle Detail', vehicle: results.vehicle, vehicle_people: results.vehicle_people });
    });

};

// Display Vehicle create form on GET.
exports.vehicle_create_get = function(req, res, next) {
    res.render('vehicle_form', { title: 'Create vehicle'});
};

// Handle Vehicle create on POST.
exports.vehicle_create_post = [

    // Validate and sanitize fields.
    body('make').trim().isLength({ min: 1 }).escape().withMessage('make must be specified.')
        .isAlphanumeric().withMessage('First name has non-alphanumeric characters.'),
    body('model').trim().isLength({ min: 1 }).escape().withMessage('model must be specified.')
        .isAlphanumeric().withMessage('Family name has non-alphanumeric characters.'),
    body('year', 'Invalid year').require({ checkFalsy: true }).isISO8601().toDate(),
    body('date_of_death', 'Invalid date of death').optional({ checkFalsy: true }).isISO8601().toDate(),

    // Process request after validation and sanitization.
    (req, res, next) => {

        // Extract the validation errors from a request.
        const errors = validationResult(req);
        
        // Create Vehicle object with escaped and trimmed data
        var vehicle = new Vehicle(
            {
                make: req.body.make,
                model: req.body.model,
                year: req.body.year,
                date_of_death: req.body.date_of_death,
            }
        );

        if (!errors.isEmpty()) {
            // There are errors. Render form again with sanitized values/errors messages.
            res.render('vehicle_form', { title: 'Create Vehicle', vehicle: vehicle, errors: errors.array() });
            return;
        }
        else {
            // Data from form is valid.

            // Save vehicle.
            vehicle.save(function (err) {
                if (err) { return next(err); }
                // Successful - redirect to new vehicle record.
                res.redirect(vehicle.url);
            });
        }
    }
];

// Display Vehicle delete form on GET.
exports.vehicle_delete_get = function (req, res, next) {

    async.parallel({
        vehicle: function (callback) {
            Vehicle.findById(req.params.id).exec(callback)
        },
        vehicles_books: function (callback) {
            Book.find({ 'vehicle': req.params.id }).exec(callback)
        },
    }, function (err, results) {
        if (err) { return next(err); }
        if (results.vehicle == null) { // No results.
            res.redirect('/catalog/vehicles');
        }
        // Successful, so render.
        res.render('vehicle_delete', { title: 'Delete Vehicle', vehicle: results.vehicle, vehicle_books: results.vehicles_books });
    });

};


// Handle Vehicle delete on POST.
exports.vehicle_delete_post = function (req, res, next) {

    async.parallel({
        vehicle: function (callback) {
            Vehicle.findById(req.body.vehicleid).exec(callback)
        },
        vehicles_books: function (callback) {
            Book.find({ 'vehicle': req.body.vehicleid }).exec(callback)
        },
    }, function (err, results) {
        if (err) { return next(err); }
        // Success.
        if (results.vehicles_books.length > 0) {
            // Vehicle has books. Render in same way as for GET route.
            res.render('vehicle_delete', { title: 'Delete Vehicle', vehicle: results.vehicle, vehicle_books: results.vehicles_books });
            return;
        }
        else {
            // Vehicle has no books. Delete object and redirect to the list of vehicles.
            Vehicle.findByIdAndRemove(req.body.vehicleid, function deleteVehicle(err) {
                if (err) { return next(err); }
                // Success - go to vehicle list.
                res.redirect('/catalog/vehicles')
            })

        }
    });

};

// Display Vehicle update form on GET.
exports.vehicle_update_get = function (req, res, next) {

    Vehicle.findById(req.params.id, function (err, vehicle) {
        if (err) { return next(err); }
        if (vehicle == null) { // No results.
            var err = new Error('Vehicle not found');
            err.status = 404;
            return next(err);
        }
        // Success.
        res.render('vehicle_form', { title: 'Update Vehicle', vehicle: vehicle });

    });
};

// Handle Vehicle update on POST.
exports.vehicle_update_post = [

    // Validate and santize fields.
    body('make').trim().isLength({ min: 1 }).escape().withMessage('First name must be specified.')
        .isAlphanumeric().withMessage('First name has non-alphanumeric characters.'),
    body('model').trim().isLength({ min: 1 }).escape().withMessage('Family name must be specified.')
        .isAlphanumeric().withMessage('Family name has non-alphanumeric characters.'),
    body('year', 'Invalid date of birth').optional({ checkFalsy: true }).isISO8601().toDate(),
    body('date_of_death', 'Invalid date of death').optional({ checkFalsy: true }).isISO8601().toDate(),


    // Process request after validation and sanitization.
    (req, res, next) => {

        // Extract the validation errors from a request.
        const errors = validationResult(req);

        // Create Vehicle object with escaped and trimmed data (and the old id!)
        var vehicle = new Vehicle(
            {
                make: req.body.make,
                model: req.body.model,
                year: req.body.year,
                date_of_death: req.body.date_of_death,
                _id: req.params.id
            }
        );

        if (!errors.isEmpty()) {
            // There are errors. Render the form again with sanitized values and error messages.
            res.render('vehicle_form', { title: 'Update Vehicle', vehicle: vehicle, errors: errors.array() });
            return;
        }
        else {
            // Data from form is valid. Update the record.
            Vehicle.findByIdAndUpdate(req.params.id, vehicle, {}, function (err, thevehicle) {
                if (err) { return next(err); }
                // Successful - redirect to genre detail page.
                res.redirect(thevehicle.url);
            });
        }
    }
];