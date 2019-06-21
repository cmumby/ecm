const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Attachment = require('../../Attachment');

const RegisteredAddress = new Schema({
    firstLine: String,
    secondLine: String,
    city: String,
    state: String,
    country: String,
    postalCode: Number,
    attachments: [Attachment],
    raCorrectionRequired: Boolean,
    comments: String,
    complete: Boolean
});