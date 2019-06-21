const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ForProgramUseOnly = new Schema({
    disputeTo: String,
    dateDisupteRaised: Date,
    dateDisputeSettled: Date,
    dateOfDisposition: Date,
    artifactUploaded: Boolean,
    isSharedCustomer: Boolean
}); 