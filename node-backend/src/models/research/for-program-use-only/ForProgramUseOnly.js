let mongoose = require("mongoose");
let Schema = mongoose.Schema;

let ForProgramUseOnly = new Schema({
    disputeTo: String,
    dateDisupteRaised: Date,
    dateDisputeSettled: Date,
    dateOfDisposition: Date,
    artifactUploaded: Boolean,
    isSharedCustomer: Boolean
}); 