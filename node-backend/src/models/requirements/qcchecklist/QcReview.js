var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var Attachment = require('../../Attachment');

var QcReview = new Schema({
    spellingAndLanguage: String,
    reasonableness: Boolean,
    documentation: Boolean,
    completeSarf: Boolean,
    completeFields: Boolean,
    attachments: [Attachment],
    raCorrectionRequired: Boolean,
    comments: String,
    complete: Boolean
});