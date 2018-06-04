var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var Attachment = require('../../Attachment');

var ScreeningCustomer = new Schema({
    pepScreening: Boolean,
    pepComments: String,
    bsaHotlistScreeining: Boolean,
    bsaHotlistComments: String,
    negativeNewsScreening: Boolean,
    negativeNewsComments: String,
    attachments: [Attachment],
    raCorrectionRequired: Boolean,
    comments: String,
    complete: Boolean
});