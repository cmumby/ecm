var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var Attachment = require('./Attachment');

var Pep = new Schema({
    isPep: Boolean,
    attachments: [Attachment],
    raCorrectionRequired: Boolean,
    comments: String,
    complete: Boolean
});