let mongoose = require("mongoose");
let Schema = mongoose.Schema;
let Attachment = require('../../Attachment');
let InvestagationIds = require('./InvestagationIds');

let Reports = new Schema({
    investagationIds: [InvestagationIds],
    attachments: [Attachment],
    raCorrectionRequired: Boolean,
    comments: String,
    complete: Boolean
});