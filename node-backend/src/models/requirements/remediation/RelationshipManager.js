var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var Attachment = require('../../Attachment');

var RelationshipManager = new Schema({
    rm: String,
    om: String,
    attachments: [Attachment],
    raCorrectionRequired: Boolean,
    comments: String,
    complete: Boolean
});