var mongoose = require('mongoose');

const { DateTime } = require("luxon");  //for date handling

var Schema = mongoose.Schema;

var IncidentSchema = new Schema(
    {
        occurence_time: {type: String, required: true, maxlength:7, minlength:7},

        occurence_date: {type: Date, required: true,},

        name: {type: String, required: true, maxlength:100},

        social_security_number: {type: Number, required: true, maxlength:9, minlength:9},

        date_of_birth: {type: Date, required: true,},

        license_plate_state: {type: String, required: true, maxlength:2, enum: ['AL', 'AK', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'FL', 'GA', 'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME', 'MD', 'MA', 'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH', 'NJ', 'NM', 'NY', 'NC', 'ND', 'OH', 'OK', 'OR', 'PA', 'RI', 'SC', 'SD','TN', 'TX', 'UT', 'VT', 'VA', 'WA', 'WV', 'WI', 'WY',], default: 'AL'},

        officer_name: {type: String, required: true, maxlength:100},

        report_date: {type: Date, required: true,},

        report_time: {type: String, required: true,  maxlength:7, minlength:7},

        code: {type: Boolean, required: true,},

        incident_type: {type: String, required: true,},

        location: {type: String, required: true,},

        license_number: {type: Number, required: true,},

        license_state: {type: String, required: true,},

        license_date: {type: Date, required: true,},

        license_plate_number: {type: Number, required: true,},

        officer_serial_number: {type: Number, required: true,},

        value: {type: Number, required: false,},

        serial_number: {type: Number, required: true,},

        gang_affiliation: {type: Boolean, required: false,},

        hazard: {type: Boolean, required: false,},

        hazard_information: {type: String, required: false,},

        narriative: {type: String, required: true,},
    }
);
