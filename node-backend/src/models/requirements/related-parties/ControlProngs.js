let mongoose = require("mongoose");
let Schema = mongoose.Schema;
let Attachment = require('../../Attachment');
let BeneficialOwner = require('./BeneficialOwner');

let ControlProngs = new Schema({
    beneficialOwners: [BeneficialOwner],
    attachments: [Attachment],
    raCorrectionRequired: Boolean,
    comments: String,
    complete: Boolean
});