const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Attachment = require('../../Attachment');

const ScreeningCustomer = new Schema({
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