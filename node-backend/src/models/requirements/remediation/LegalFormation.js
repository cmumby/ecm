const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Attachment = require('../../Attachment');

const LegalFormation = new Schema({
    stateOfRegistration: String,
    attachments: [Attachment],
    raCorrectionRequired: Boolean,
    comments: String,
    complete: Boolean
});