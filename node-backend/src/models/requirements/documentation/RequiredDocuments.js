var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var Attachment = require('../../Attachment');
var RequiredDocuments = require('./RequiredDocuments');

var RequiredDocuments = new Schema({
    formationDocuments: Boolean,
    evidenceOfFiling: Boolean,
    signedBoForm: Boolean,
    attachments: [Attachment],
    raCorrectionRequired: Boolean,
    comments: String,
    complete: Boolean
});