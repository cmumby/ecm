const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Attachment = require('../../Attachment');

const QcReview = new Schema({
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