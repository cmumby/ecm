var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var Attachment = require('../../Attachment');
var ScreeningCustomer = require('./ScreeningCustomer');

var screeningParty = new Schema({
    parties: [ScreeningCustomer],
    attachments: [Attachment],
    raCorrectionRequired: Boolean,
    comments: String,
    complete: Boolean
});