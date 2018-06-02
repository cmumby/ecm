var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var Attachment = require('../../Attachment');

var SourceOfWealth = new Schema({
    wealthSource: String,
    attachments: [Attachment],
    raCorrectionRequired: Boolean,
    comments: String,
    complete: Boolean
});