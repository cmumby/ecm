const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Attachment = require('../../Attachment');
const BeneficialOwner = require('./BeneficialOwner');

const ControlProngs = new Schema({
    beneficialOwners: [BeneficialOwner],
    attachments: [Attachment],
    raCorrectionRequired: Boolean,
    comments: String,
    complete: Boolean
});