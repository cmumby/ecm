var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var Attachment = require('../../Attachment');


var QcInformation = new Schema({
    qcName: String,
    dateReceived: Date,
    firstReview: Boolean,
    secondReview: Boolean,
    attachments: [Attachment],
    raCorrectionRequired: Boolean,
    comments: String,
    complete: Boolean
});