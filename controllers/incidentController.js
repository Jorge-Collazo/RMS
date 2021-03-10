var persons = require('../models/incident');
var async = require('async');


const { body, validationResult } = require('express-validator');


exports.index = function (req, res) {

    async.parallel({
        incident_count: function (callback) {
            incident.countDocuments({}, callback); // Pass an empty object as match condition to find all documents of this collection
        },
        incident_available_count: function (callback) {
            incident.countDocuments({ status: 'Available' }, callback);
        },
        people_count: function (callback) {
            people.countDocuments({}, callback);
        },
        vehicle_count: function (callback) {
            vehicle.countDocuments({}, callback);
        }
    }, function (err, results) {
        res.render('index', { title: 'Local Library Home', error: err, data: results });
    });
};

// Display list of all vehicles
exports.incident_list = function (req, res, next) {

    incident.find()
        .sort([['family_name', 'ascending']])
        .exec(function (err, list_incident) {
            if (err) { return next(err); }
            //Successful, so render
            res.render('incident_list', { title: 'Incident List', incident_list: list_incident });
        });

};
//finished some stuff
// Display detail page for a specific Incident.
exports.incident_detail = function (req, res, next) {

    async.parallel({
        incident: function (callback) {
            incident.findById(req.params.id)
                .exec(callback)
        },
        incidents_books: function (callback) {
            Book.find({ 'incident': req.params.id }, 'title summary')
                .exec(callback)
        },
    }, function (err, results) {
        if (err) { return next(err); } // Error in API usage.
        if (results.vehicle == null) { // No results.
            var err = new Error('Incident not found');
            err.status = 404;
            return next(err);
        }
        // Successful, so render.
        res.render('incident_detail', { title: 'Incident Detail', incident: results.incident, incident_books: results.incidents_books });
    });

};

// Display Incident create form on GET.
exports.incident_create_get = function (req, res, next) {
    res.render('incident_form', { title: 'Create Incident' });
};

// Handle Incident create on POST.
exports.incident_create_post = [

    // Validate and sanitize fields.
    body('occurence_time').trim().isLength({ min: 1 }).escape().withMessage('First name must be specified.')
        .isAlphanumeric().withMessage('First name has non-alphanumeric characters.'),
    body('occurence_date').trim().isLength({ min: 1 }).escape().withMessage('Family name must be specified.')
        .isAlphanumeric().withMessage('Family name has non-alphanumeric characters.'),
    body('name').trim().isLength({ min: 1 }).escape().withMessage('First name must be specified.')
        .isAlphanumeric().withMessage('First name has non-alphanumeric characters.'),
    body('social_security_number').trim().isLength({ min: 9 }).escape.withMessage('Social Security number must be specified')
        .isNumber().withMessage('000000000'),
    body('date_of_birth').optional({ checkFalsy: true }).isISO8601().toDate(),
    body('license_plate_state').optional({ checkFalsy: true }).isISO8601().toDate(),
    body('officer_name').trim().isLength({ min: 1 }).escape().withMessage('First name must be specified.')
        .isAlphanumeric().withMessage('First name has non-alphanumeric characters.'),
    body('report_date').optional({ checkFalsy: true }).isISO8601().toDate(),
    body('report_time').optional({ checkFalsy: true }).isISO8601().toDate(),
    body('people_involved').optional({ checkFalsy: true }).isISO8601().toDate(),
    body('code').optional({ checkFalsy: true }).isISO8601().toDate(),
    body('vehicle').optional({ checkFalsy: true }).isISO8601().toDate(),
    body('incident_type').optional({ checkFalsy: true }).isISO8601().toDate(),
    body('location').optional({ checkFalsy: true }).isISO8601().toDate(),
    body('license_number').optional({ checkFalsy: true }).isISO8601().toDate(),
    body('license_state').optional({ checkFalsy: true }).isISO8601().toDate(),
    body('license_date').optional({ checkFalsy: true }).isISO8601().toDate(),
    body('license_plate_number').optional({ checkFalsy: true }).isISO8601().toDate(),
    body('officer_serial_number').optional({ checkFalsy: true }).isISO8601().toDate(),
    body('value').optional({ checkFalsy: true }).isISO8601().toDate(),
    body('serial_number').optional({ checkFalsy: true }).isISO8601().toDate(),
    body('gang_affiliation').optional({ checkFalsy: true }).isISO8601().toDate(),
    body('narriative').optional({ checkFalsy: true }).isISO8601().toDate(),
    body('hazard_information').optional({ checkFalsy: true }).isISO8601().toDate(),
    body('hazard').optional({ checkFalsy: true }).isISO8601().toDate(),

    // Process request after validation and sanitization.
    (req, res, next) => {

        // Extract the validation errors from a request.
        const errors = validationResult(req);

        // Create Incident object with escaped and trimmed data
        var incident = new Incident(
            {
                occurence_time: req.body.occurence_time,

                occurence_date: req.body.occurence_date,

                name: req.body.name,

                social_security_number: req.body.social_security_number,

                date_of_birth: req.body.date_of_birth,

                license_plate_state: req.body.license_plate_state,

                officer_name: req.body.officer_name,

                report_date: req.body.report_date,

                report_time: req.body.report_time,

                people_involved: req.body.people_involved,

                code: req.body.code,

                vehicle: req.body.vehicle,

                incident_type: req.body.incident_type,

                location: req.body.location,

                license_number: req.body.license_number,

                license_state: req.body.license_state,

                license_date: req.body.license_date,

                license_plate_number: req.body.license_plate_number,

                officer_serial_number: req.body.officer_serial_number,

                value: req.body.value,

                serial_number: req.body.serial_number,

                gang_affiliation: req.body.gang_affiliation,

                hazard: req.body.hazard,

                hazard_information: req.body.hazard_information,

                narriative: req.body.narriative,

            }
        );

        if (!errors.isEmpty()) {
            // There are errors. Render form again with sanitized values/errors messages.
            res.render('incident_form', { title: 'Create Incident', incident: incident, errors: errors.array() });
            return;
        }
        else {
            // Data from form is valid.

            // Save incident.
            incident.save(function (err) {
                if (err) { return next(err); }
                // Successful - redirect to new incident record.
                res.redirect(incident.url);
            });
        }
    }
];

// Display Incident delete form on GET.
exports.incident_delete_get = function (req, res, next) {

    async.parallel({
        incident: function (callback) {
            Incident.findById(req.params.id).exec(callback)
        },
        incidents_books: function (callback) {
            Book.find({ 'incident': req.params.id }).exec(callback)
        },
    }, function (err, results) {
        if (err) { return next(err); }
        if (results.incident == null) { // No results.
            res.redirect('/catalog/incident');
        }
        // Successful, so render.
        res.render('incident_delete', { title: 'Delete Incident', incident: results.incident, incident_books: results.incidents_books });
    });

};


// Handle Incident delete on POST.
exports.incident_delete_post = function (req, res, next) {

    async.parallel({
        incident: function (callback) {
            Incident.findById(req.body.incidentid).exec(callback)
        },
        incidents_books: function (callback) {
            Book.find({ 'incident': req.body.incidentid }).exec(callback)
        },
    }, function (err, results) {
        if (err) { return next(err); }
        // Success.
        if (results.incidents_books.length > 0) {
            // Incident has books. Render in same way as for GET route.
            res.render('incident_delete', { title: 'Delete Incident', incident: results.incident, incident_books: results.incidents_books });
            return;
        }
        else {
            // Incident has no books. Delete object and redirect to the list of incident.
            Incident.findByIdAndRemove(req.body.incidentid, function deleteAuthor(err) {
                if (err) { return next(err); }
                // Success - go to incident list.
                res.redirect('/catalog/incident')
            })

        }
    });

};

// Display Incident update form on GET.
exports.incident_update_get = function (req, res, next) {

    Incident.findById(req.params.id, function (err, incident) {
        if (err) { return next(err); }
        if (incident == null) { // No results.
            var err = new Error('Incident not found');
            err.status = 404;
            return next(err);
        }
        // Success.
        res.render('incident_form', { title: 'Update Incident', incident: incident });

    });
};

// Handle Incident update on POST.
exports.incident_update_post = [

    // Validate and santize fields.
    body('first_name').trim().isLength({ min: 1 }).escape().withMessage('First name must be specified.')
        .isAlphanumeric().withMessage('First name has non-alphanumeric characters.'),
    body('family_name').trim().isLength({ min: 1 }).escape().withMessage('Family name must be specified.')
        .isAlphanumeric().withMessage('Family name has non-alphanumeric characters.'),
    body('date_of_birth', 'Invalid date of birth').optional({ checkFalsy: true }).isISO8601().toDate(),
    body('date_of_death', 'Invalid date of death').optional({ checkFalsy: true }).isISO8601().toDate(),


    // Process request after validation and sanitization.
    (req, res, next) => {

        // Extract the validation errors from a request.
        const errors = validationResult(req);

        // Create Incident object with escaped and trimmed data (and the old id!)
        var incident = new Incident(
            {
                first_name: req.body.first_name,
                family_name: req.body.family_name,
                date_of_birth: req.body.date_of_birth,
                date_of_death: req.body.date_of_death,
                _id: req.params.id
            }
        );

        if (!errors.isEmpty()) {
            // There are errors. Render the form again with sanitized values and error messages.
            res.render('incident_form', { title: 'Update Incident', incident: incident, errors: errors.array() });
            return;
        }
        else {
            // Data from form is valid. Update the record.
            Incident.findByIdAndUpdate(req.params.id, incident, {}, function (err, theincident) {
                if (err) { return next(err); }
                // Successful - redirect to genre detail page.
                res.redirect(theincident.url);
            });
        }
    }
];