var People = require('../models/people');
var async = require('async');
var Incident = require('../models/incident');
var Vehicle = require('../models/vehicle');

const { body, validationResult } = require('express-validator');

// Display list of all Peoples.
exports.people_list = function (req, res, next) {

    People.find()
        .sort([['family_name', 'ascending']])
        .exec(function (err, list_peoples) {
            if (err) { return next(err); }
            //Successful, so render
            res.render('people_list', { title: 'People List', people_list: list_peoples });
        });
};

// Display detail page for a specific Person.
exports.people_detail = function (req, res, next) {

    async.parallel({
        people: function (callback) {
            People.findById(req.params.id)
                .exec(callback)
        },
        peoples_vehicles: function (callback) {
            Vehicle.find({ 'people': req.params.id }, 'title summary')
                .exec(callback)
        },
        peoples_Incident: function (callback) {
            Incident.find({ 'people': req.params.id }, 'title summary')
                .exec(callback)
        },
    }, function (err, results) {
        if (err) { return next(err); } // Error in API usage.
        if (results.people == null) { // No results.
            var err = new Error('People not found');
            err.status = 404;
            return next(err);
        }
        // Successful, so render.
        res.render('people_detail', { title: 'People Detail', people: results.people, people_vehicles: results.peoples_vehicles });
    });

};

exports.people_create_get = function(req, res, next) {
    res.render('people_form', { title: 'Create People'});
};

// Handle People create on POST.
exports.people_create_post = [

    // Validate and sanitize fields.
    body('first_name').trim().isLength({ min: 1 }).escape().withMessage('First name must be specified.')
        .isAlphanumeric().withMessage('First name has non-alphanumeric characters.'),

    body('middle_initial').trim().isLength({ min: 1 }).escape().withMessage('Middle initial if available.')
        .isAlphanumeric().withMessage('Middle initial has non-alphanumeric characters.'),

    body('last_name').trim().isLength({ min: 1 }).escape().withMessage('Last name must be specified.')
        .isAlphanumeric().withMessage('Last name has non-alphanumeric characters.'),

    body('social_security_number').trim().isLength({min: 9}).escape.withMessage('Social Security number must be specified')
        .isNumber().withMessage('000000000'),

    body('age').trim().isLength({min: 1}).escape().withMessage('Age name must be specified.')
        .isNumber().withMessage('000000000'),
    
    body('date_of_birth', 'Invalid date of birth').optional({ checkFalsy: true }).isISO8601().toDate(),
    body('date_of_death', 'Invalid date of death').optional({ checkFalsy: true }).isISO8601().toDate(),

    // Process request after validation and sanitization.
    (req, res, next) => {

        // Extract the validation errors from a request.
        const errors = validationResult(req);
        
        // Create People object with escaped and trimmed data
        var people = new People(
            {
                first_name: { type: String, required: true, maxlength: 100 },

                middle_initial:{type: String, required: false, maxlength: 2},

                last_name: { type: String, required: true, maxlength: 100 },

                social_security_number:{type: Number, required: true, maxlength:9, minlength:9},

                age:{type: Number, required: true, maxlength:3, minlength:1},

                date_of_birth: {type: Date, required: true},

                phone_number: {type: Number, required: true, maxlength:9, minlength:9},

                home_address: {type: String, required: true, },

                weight: {type: Number, required: true, maxlength:3},

                height: {type: Number, required: true, maxlength:3},

                eye_color: {type: String, required: true, enum: ['UNK', 'BRO', 'GRN', 'BLU', 'DBL', 'LBL'], default: 'UNK'},

                race: {type: String, required: true, enum: ['U', 'W', 'B', 'H', 'I', 'A'], default: 'U'},

                hair_color: {type: String, required: true, enum: ['UNK','BGE','BLK','BLU', 'DBL', 'LBL', 'BRZ', 'BRO', 'GLD', 'GRY', 'GRN', 'MAR', 'ORG', 'PNK', 'PLE', 'RED', 'SIL', 'TAN', 'TRQ', 'WHI', 'YEL', 'TEA', 'BLN', 'HAZ', 'BLD'], default: 'UNK'},

                gender: {type: String, required: true, enum: ['Unknown', 'Male', 'Female'], default: 'Unknown'},

                additional_information: {type: String, required: false},

                identification_code: {type: Boolean, required:false},

                gang_affiliation: {type: Boolean, required:false},

                hazard_identification: {type: Boolean, required:false},

                hazard_information: {type: String, required: false},

                license_number: {type: Number, required: true, maxlength:11},

                license_date: {type: Date, required: true},

                license_state: {type: String, required: true, maxlength:2, enum: ['AL', 'AK', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'FL', 'GA', 'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME', 'MD', 'MA', 'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH', 'NJ', 'NM', 'NY', 'NC', 'ND', 'OH', 'OK', 'OR', 'PA', 'RI', 'SC', 'SD','TN', 'TX', 'UT', 'VT', 'VA', 'WA', 'WV', 'WI', 'WY',], default: 'AL'},

                registered_vehicle: {type: Schema.Types.ObjectId, ref: 'vehicle', required: false},

                previous_vhicles: {type: Schema.Types.ObjectId, ref: 'vehicle', required: false,},

                incident_report_number: {type: Schema.Types.ObjectId, ref: 'incident', required: true},

                incident_type: {type: Schema.Types.ObjectId, ref: 'incident', required: true},

                incident_date: {type: Schema.Types.ObjectId, ref: 'incident', required: true},
            }
        );

        if (!errors.isEmpty()) {
            // There are errors. Render form again with sanitized values/errors messages.
            res.render('people_form', { title: 'Create People', people: people, errors: errors.array() });
            return;
        }
        else {
            // Data from form is valid.

            // Save people.
            people.save(function (err) {
                if (err) { return next(err); }
                // Successful - redirect to new people record.
                res.redirect(people.url);
            });
        }
    }
];

// Display People delete form on GET.
exports.people_delete_get = function (req, res, next) {

    async.parallel({
        people: function (callback) {
            People.findById(req.params.id).exec(callback)
        },
        peoples_vehicles: function (callback) {
            Vehicle.find({ 'people': req.params.id }).exec(callback)
        },
    }, function (err, results) {
        if (err) { return next(err); }
        if (results.people == null) { // No results.
            res.redirect('/catalog/peoples');
        }
        // Successful, so render.
        res.render('people_delete', { title: 'Delete People', people: results.people, people_vehicles: results.peoples_vehicles });
    });

};


// Handle People delete on POST.
exports.people_delete_post = function (req, res, next) {

    async.parallel({
        people: function (callback) {
            People.findById(req.body.peopleid).exec(callback)
        },
        peoples_vehicles: function (callback) {
            Vehicle.find({ 'people': req.body.peopleid }).exec(callback)
        },
    }, function (err, results) {
        if (err) { return next(err); }
        // Success.
        if (results.peoples_vehicles.length > 0) {
            // People has vehicles. Render in same way as for GET route.
            res.render('people_delete', { title: 'Delete People', people: results.people, people_vehicles: results.peoples_vehicles });
            return;
        }
        else {
            // People has no vehicles. Delete object and redirect to the list of peoples.
            People.findByIdAndRemove(req.body.peopleid, function deletePeople(err) {
                if (err) { return next(err); }
                // Success - go to people list.
                res.redirect('/catalog/peoples')
            })

        }
    });

};

// Display People update form on GET.
exports.people_update_get = function (req, res, next) {

    People.findById(req.params.id, function (err, people) {
        if (err) { return next(err); }
        if (people == null) { // No results.
            var err = new Error('People not found');
            err.status = 404;
            return next(err);
        }
        // Success.
        res.render('people_form', { title: 'Update People', people: people });

    });
};

// Handle People update on POST.
exports.people_update_post = [

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

        // Create People object with escaped and trimmed data (and the old id!)
        var people = new People(
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
            res.render('people_form', { title: 'Update People', people: people, errors: errors.array() });
            return;
        }
        else {
            // Data from form is valid. Update the record.
            People.findByIdAndUpdate(req.params.id, people, {}, function (err, thepeople) {
                if (err) { return next(err); }
                // Successful - redirect to genre detail page.
                res.redirect(thepeople.url);
            });
        }
    }
];