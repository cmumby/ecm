let mongoose = require("mongoose");
let Schema = mongoose.Schema;
let Attachment = require('../../Attachment');

let sourceOfFunds = new Schema({
    wealthSource: String,
    attachments: [Attachment],
    raCorrectionRequired: Boolean,
    comments: String,
    complete: Boolean
});