let mongoose = require("mongoose");
let Schema = mongoose.Schema;
let Attachment = require('../../Attachment');

let InvestmentVechiclesFunds = new Schema({
    isInvestment: Boolean,
    relatedEntityFunds: Boolean,
    secRiaNumber: Number,
    attachments: [Attachment],
    raCorrectionRequired: Boolean,
    comments: String,
    complete: Boolean
});