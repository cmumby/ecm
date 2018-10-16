let mongoose = require("mongoose");
let Schema = mongoose.Schema;
let Attachment = require('../../Attachment');
let ScreeningCustomer = require('./ScreeningCustomer');

let screeningParty = new Schema({
    parties: [ScreeningCustomer],
    attachments: [Attachment],
    raCorrectionRequired: Boolean,
    comments: String,
    complete: Boolean
});