var mongoose = require('mongoose');

const { DateTime } = require("luxon");  //for date handling

var Schema = mongoose.Schema;

var IncidentSchema = new Schema(
    {
        occurence_time: {},
        occurence_date: {},
        name: {},
        social_security_number: {},
        date _of_birth: {},
        license_plate_state: {},
        officer_name: {},
        Report_Date_&_Time: {},
        serial_number: {},
        Code: {},
        Incident_Type: {},
        Location: {},
        License_Number: {},
        License_state: {},
        License_date: {},
        License_Plate_#: {},
        Officer_serial_Number: {},
        Value_of_stolen/damage: {},
        Date: {},
        Gang_affiliation: {},
        Hazard: {},
        Hazard_information: {},
        Narriative: {},
    }
);
