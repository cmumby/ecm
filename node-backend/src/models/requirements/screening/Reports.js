var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var Attachment = require('../../Attachment');
var InvestagationIds = require('./InvestagationIds');

var Reports = new Schema({
    investagationIds: [InvestagationIds],
    attachments: [Attachment],
    raCorrectionRequired: Boolean,
    comments: String,
    complete: Boolean
});