let mongoose = require("mongoose");
let Schema = mongoose.Schema;
let Attachment = require('../../Attachment');

let LegalEntity = new Schema({
    entityType: String,
    attachments: [Attachment],
    raCorrectionRequired: Boolean,
    comments: String,
    complete: Boolean
});