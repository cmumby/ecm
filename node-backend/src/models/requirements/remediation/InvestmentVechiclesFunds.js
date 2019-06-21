const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Attachment = require('../../Attachment');

const InvestmentVechiclesFunds = new Schema({
    isInvestment: Boolean,
    relatedEntityFunds: Boolean,
    secRiaNumber: Number,
    attachments: [Attachment],
    raCorrectionRequired: Boolean,
    comments: String,
    complete: Boolean
});