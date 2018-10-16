let mongoose = require("mongoose");
let Schema = mongoose.Schema;
let Attachment = require('../../Attachment');

let QcReview = new Schema({
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