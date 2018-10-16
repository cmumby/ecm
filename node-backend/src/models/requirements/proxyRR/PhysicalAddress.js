let mongoose = require("mongoose");
let Schema = mongoose.Schema;
let Attachment = require('../../Attachment');

let PhysicalAddress = new Schema({
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