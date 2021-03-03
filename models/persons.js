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
        weight: {type: Number, required: true},
        height: {type: Number, required: true},
        eye_color: {type: String, },
        race: {type: String, },
        hair_color: {type: String, },
        gender: {type: String, },
        additional_information: {type: String},
        //image: {type: Image},
        identification_code: {type: Boolean, required:false},
        gang_affiliation: {type: Boolean, required:false},
        hazard_identification: {type: Boolean, required:false},
        hazard_information: {type: String},
        license_number: {type: Number, required: true},
        license_date: {type: Date},
        license_state: {type: String},
        registered_vehicle: {type: Schema.Types.ObjectId, ref: 'vehicle', required: false},
        previous_vhicles: {type: Schema.Types.ObjectId, ref: 'vehicle', required: false,
        incident_report_number: {type: Schema.Types.ObjectId, ref: 'incident', required: true},
        incident_type: {type: Schema.Types.ObjectId, ref: 'incident', required: true},
        incident_date: {type: Schema.Types.ObjectId, ref: 'incident', required: true},
    }
);
