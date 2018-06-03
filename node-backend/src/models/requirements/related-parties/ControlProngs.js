var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var Attachment = require('../../Attachment');
var BeneficialOwner = require('./BeneficialOwner');

var ControlProngs = new Schema({
    beneficialOwners: [BeneficialOwner],
    attachments: [Attachment],
    raCorrectionRequired: Boolean,
    comments: String,
    complete: Boolean
});