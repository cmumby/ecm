let mongoose = require("mongoose");
let Schema = mongoose.Schema;
let Attachment = require('../../Attachment');

let ManagedReportingAttributes = new Schema({
    customer: String,
    divison: String,
    rcbo: String,
    div: String,
    attachments: [Attachment],
    raCorrectionRequired: Boolean,
    comments: String,
    complete: Boolean
});