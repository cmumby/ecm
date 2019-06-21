const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Attachment = require('../../Attachment');

const CustomerDetails = new Schema({
    organizationType: String,
    attachments: [Attachment],
    raCorrectionRequired: Boolean,
    comments: String,
    complete: Boolean
});