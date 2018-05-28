var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var Attachment = require('./Attachment');

var NatureOfBusiness = new Schema({
    naics: String,
    attachments: [Attachment],
    raCorrectionRequired: Boolean,
    comments: String,
    complete: Boolean
});