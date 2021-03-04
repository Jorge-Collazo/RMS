var mongoose = require('mongoose');

const { DateTime } = require("luxon");  //for date handling

var Schema = mongoose.Schema;

var VehicleSchema = new Schema(
    {
        license_plate_number: {type: Number, required: true, maxlength:11},
        year: {type: Number, required: true, minlength:1900, maxlength:2022 },
        vehicle_id_number: {type: string, required: true, minlength: 17, maxlength: 17},
        make: {type: string, required: true},
        model: {type: string, required: true},
        color: {type: string},
        value: {},
        incident_report_number: {type: Schema.Types.ObjectId, ref: 'incident', required: true},
        incident_type: {type: Schema.Types.ObjectId, ref: 'incident', required: true},
        incident_date: {type: Schema.Types.ObjectId, ref: 'incident', required: true},
        regisered_owner: {},
        previous_owners: {},
        additional_information: {},
    }
);
