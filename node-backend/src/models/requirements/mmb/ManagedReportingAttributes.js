var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var Attachment = require('../../Attachment');

var ManagedReportingAttributes = new Schema({
    customer: String,
    divison: String,
    rcbo: String,
    div: String,
    attachments: [Attachment],
    raCorrectionRequired: Boolean,
    comments: String,
    complete: Boolean
});