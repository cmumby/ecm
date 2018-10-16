let mongoose = require("mongoose");
let Schema = mongoose.Schema;
let Attachment = require('../../Attachment');

let RequiredDocuments = new Schema({
    formationDocuments: Boolean,
    evidenceOfFiling: Boolean,
    signedBoForm: Boolean,
    attachments: [Attachment],
    raCorrectionRequired: Boolean,
    comments: String,
    complete: Boolean
});