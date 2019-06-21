const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Attachment = require('../../Attachment');

const ManagedReportingAttributes = new Schema({
    customer: String,
    divison: String,
    rcbo: String,
    div: String,
    attachments: [Attachment],
    raCorrectionRequired: Boolean,
    comments: String,
    complete: Boolean
});