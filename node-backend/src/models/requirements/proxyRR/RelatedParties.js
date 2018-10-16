let mongoose = require("mongoose");
let Schema = mongoose.Schema;
let Attachment = require('../../Attachment');

let RelatedParties = new Schema({
    anyForeignParties: Boolean,
    attachments: [Attachment],
    raCorrectionRequired: Boolean,
    comments: String,
    complete: Boolean
});