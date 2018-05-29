var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var Attachment = require('../../Attachment');

var RegisteredAddress = new Schema({
    firstLine: String,
    secondLine: String,
    city: String,
    state: String,
    country: String,
    postalCode: Number,
    attachments: [Attachment],
    raCorrectionRequired: Boolean,
    comments: String,
    complete: Boolean
});