const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Attachment = require('../../Attachment');

const QcInformation = new Schema({
    qcName: String,
    dateReceived: Date,
    firstReview: Boolean,
    secondReview: Boolean,
    attachments: [Attachment],
    raCorrectionRequired: Boolean,
    comments: String,
    complete: Boolean
});