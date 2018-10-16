let mongoose = require("mongoose");
let Schema = mongoose.Schema;
let Attachment = require('../../Attachment');

let ScreeningCustomer = new Schema({
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