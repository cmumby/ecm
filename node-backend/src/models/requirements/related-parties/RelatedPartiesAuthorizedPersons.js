let mongoose = require("mongoose");
let Schema = mongoose.Schema;
let Attachment = require('../../Attachment');
let AuthorizedPersons = require('./AuthorizedPersons');

let RelatedPartiesAuthorizedPersons = new Schema({
    anyNonUltimateBo: Boolean,
    authorizedPersons: [AuthorizedPersons],
    attachments: [Attachment],
    raCorrectionRequired: Boolean,
    comments: String,
    complete: Boolean
});