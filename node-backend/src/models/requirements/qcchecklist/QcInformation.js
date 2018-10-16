let mongoose = require("mongoose");
let Schema = mongoose.Schema;
let Attachment = require('../../Attachment');

let QcInformation = new Schema({
    qcName: String,
    dateReceived: Date,
    firstReview: Boolean,
    secondReview: Boolean,
    attachments: [Attachment],
    raCorrectionRequired: Boolean,
    comments: String,
    complete: Boolean
});