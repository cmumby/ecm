var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var Attachment = require('./Attachment');

var MarketsServed = new Schema({
    countries: Array,
    attachments: [Attachment],
    raCorrectionRequired: Boolean,
    comments: String,
    complete: Boolean
});