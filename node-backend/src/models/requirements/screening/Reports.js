const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Attachment = require('../../Attachment');
const InvestagationIds = require('./InvestagationIds');

const Reports = new Schema({
    investagationIds: [InvestagationIds],
    attachments: [Attachment],
    raCorrectionRequired: Boolean,
    comments: String,
    complete: Boolean
});