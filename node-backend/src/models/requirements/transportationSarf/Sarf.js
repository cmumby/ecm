const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Attachment = require('../../Attachment');

const Sarf = new Schema({
    handlesSouthwestTrucks: Boolean,
    highRiskTransportation: Boolean,
    countryOfCitizenship: String,
    attachments: [Attachment],
    raCorrectionRequired: Boolean,
    comments: String,
    complete: Boolean
});