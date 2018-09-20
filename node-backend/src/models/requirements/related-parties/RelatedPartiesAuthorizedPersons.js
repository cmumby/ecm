var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var Attachment = require('../../Attachment');
var AuthorizedPersons = require('./AuthorizedPersons');

var RelatedPartiesAuthorizedPersons = new Schema({
    anyNonUltimateBo: Boolean,
    authorizedPersons: [AuthorizedPersons],
    attachments: [Attachment],
    raCorrectionRequired: Boolean,
    comments: String,
    complete: Boolean
});