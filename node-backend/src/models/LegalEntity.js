var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var Attachment = require('./Attachment');

var LegalEntity = new Schema({
    entityType: String,
    attachments: [Attachment],
    raCorrectionRequired: Boolean,
    comments: String,
    complete: Boolean
});