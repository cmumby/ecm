var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var Attachment = require('../../Attachment');

var InvestmentVechiclesFunds = new Schema({
    isInvestment: Boolean,
    relatedEntityFunds: Boolean,
    secRiaNumber: Number,
    attachments: [Attachment],
    raCorrectionRequired: Boolean,
    comments: String,
    complete: Boolean
});