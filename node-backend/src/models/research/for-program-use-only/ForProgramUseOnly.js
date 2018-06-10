var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var ForProgramUseOnly = new Schema({
    disputeTo: String,
    dateDisupteRaised: Date,
    dateDisputeSettled: Date,
    dateOfDisposition: Date,
    artifactUploaded: Boolean,
    isSharedCustomer: Boolean
}); 