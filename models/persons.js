var mongoose = require('mongoose');

const { DateTime } = require("luxon");  //for date handling

var Schema = mongoose.Schema;

var PeopleSchema = new Schema(
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
        eye_color: {type: String, required: true},
        race: {type: String, required: true},
        hair_color: {type: String, required: true},
        gender: {type: String, required: true},
        additional_information: {type: String, required: false},
        identification_code: {type: Boolean, required:false},
        gang_affiliation: {type: Boolean, required:false},
        hazard_identification: {type: Boolean, required:false},
        hazard_information: {type: String, required: false},
        license_number: {type: Number, required: true, maxlength:11},
        license_date: {type: Date, required: true},
        license_state: {type: String, required: true, maxlength:2},
        registered_vehicle: {type: Schema.Types.ObjectId, ref: 'vehicle', required: false},
        previous_vhicles: {type: Schema.Types.ObjectId, ref: 'vehicle', required: false,},
        incident_report_number: {type: Schema.Types.ObjectId, ref: 'incident', required: true},
        incident_type: {type: Schema.Types.ObjectId, ref: 'incident', required: true},
        incident_date: {type: Schema.Types.ObjectId, ref: 'incident', required: true},
    }
);
