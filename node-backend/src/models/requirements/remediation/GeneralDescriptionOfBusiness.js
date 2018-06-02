var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var Attachment = require('../../Attachment');

var GeneralDescriptionOfBusiness = new Schema({
    description: String,
    attachments: [Attachment],
    raCorrectionRequired: Boolean,
    comments: String,
    complete: Boolean
});