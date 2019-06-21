const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Attachment = require('../../Attachment');

const RequiredDocuments = new Schema({
    formationDocuments: Boolean,
    evidenceOfFiling: Boolean,
    signedBoForm: Boolean,
    attachments: [Attachment],
    raCorrectionRequired: Boolean,
    comments: String,
    complete: Boolean
});