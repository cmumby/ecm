const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Attachment = require('../../Attachment');
const ScreeningCustomer = require('./ScreeningCustomer');

const screeningParty = new Schema({
    parties: [ScreeningCustomer],
    attachments: [Attachment],
    raCorrectionRequired: Boolean,
    comments: String,
    complete: Boolean
});