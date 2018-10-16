let mongoose = require("mongoose");
let Schema = mongoose.Schema;
let Attachment = require('../../Attachment');

let LegalFormation = new Schema({
    countryOfRegistration: String,
    attachments: [Attachment],
    comments: String,
    complete: Boolean
});