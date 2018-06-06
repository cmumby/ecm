var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var Attachment = require('../../Attachment');


var Sarf = new Schema({
    handlesSouthwestTrucks: Boolean,
    highRiskTransportation: Boolean,
    countryOfCitizenship: String,
    attachments: [Attachment],
    raCorrectionRequired: Boolean,
    comments: String,
    complete: Boolean
});