let mongoose = require("mongoose");
let Schema = mongoose.Schema;
let Attachment = require('../../Attachment');

let Sarf = new Schema({
    handlesSouthwestTrucks: Boolean,
    highRiskTransportation: Boolean,
    countryOfCitizenship: String,
    attachments: [Attachment],
    raCorrectionRequired: Boolean,
    comments: String,
    complete: Boolean
});