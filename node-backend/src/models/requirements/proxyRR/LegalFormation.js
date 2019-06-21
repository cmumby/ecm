const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Attachment = require('../../Attachment');

const LegalFormation = new Schema({
    countryOfRegistration: String,
    attachments: [Attachment],
    comments: String,
    complete: Boolean
});