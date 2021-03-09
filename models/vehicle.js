var mongoose = require('mongoose');

const { DateTime } = require("luxon");  //for date handling

var Schema = mongoose.Schema;

//creates the vehicle schema and determines the requirements for each thing 
var VehicleSchema = new Schema(
    {
        license_plate_number: {type: Number, required: true, maxlength:11},

        year: {type: Number, required: true, minlength:1900, maxlength:2022 },

        vehicle_id_number: {type: string, required: true, minlength: 17, maxlength: 17},

        make: {type: string, required: true, minlength: 1, maxlength: 100},

        model: {type: string, required: true, minlength: 1, maxlength: 100},

        color: {type: string, required: true, enum: ['UNK','BGE','BLK','BLU', 'DBL', 'LBL', 'BRZ', 'BRO', 'GLD', 'GRY', 'GRN', 'MAR', 'ORG', 'PNK', 'PLE', 'RED', 'SIL', 'TAN', 'TRQ', 'WHI', 'YEL', 'TEA', 'BLN', 'HAZ', 'BLD'], default: 'UNK'},

        value: {type: string, required: false},

        incident_report_number: {type: Schema.Types.ObjectId, ref: 'incident', required: true},

        incident_type: {type: Schema.Types.ObjectId, ref: 'incident', required: true},

        incident_date: {type: Schema.Types.ObjectId, ref: 'incident', required: true},

        registered_owner: {type: Schema.Types.ObjectId, ref: 'people', required: true},

        previous_owners: {type: Schema.Types.ObjectId, ref: 'people', required: true},

        additional_information: {type: String, required: false},

    }
);
