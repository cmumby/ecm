const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Attachment = require('../../Attachment');
const AuthorizedPersons = require('./AuthorizedPersons');

const RelatedPartiesAuthorizedPersons = new Schema({
    anyNonUltimateBo: Boolean,
    authorizedPersons: [AuthorizedPersons],
    attachments: [Attachment],
    raCorrectionRequired: Boolean,
    comments: String,
    complete: Boolean
});