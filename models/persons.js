var mongoose = require('mongoose');

const { DateTime } = require("luxon");  //for date handling

var Schema = mongoose.Schema;

var AuthorSchema = new Schema(
    {
        first_name: { type: String, required: true, maxlength: 100 },
        middle_initial:{type: String, required: false, maxlength: 2},
        last_name: { type: String, required: true, maxlength: 100 },
        social_security_number:{},
        age:{},
        date_of_birth: { type: Date },
        date_of_death: { type: Date },
    }
);
