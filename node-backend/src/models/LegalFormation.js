var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var Attachment = require('./Attachment');

var LegalFormation = new Schema({
    countryOfRegistration: String,
    attachments: [Attachment],
    comments: String,
    complete: Boolean
});