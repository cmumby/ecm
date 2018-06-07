var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var Attachment = require('../../Attachment');

var Entity = new Schema({
    hasOus: Boolean,
    attachments: [Attachment],
    raCorrectionRequired: Boolean,
    comments: String,
    complete: Boolean
});