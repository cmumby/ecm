let mongoose = require("mongoose");
let Schema = mongoose.Schema;

let CaseReasearch = new Schema({
    issueDescription: String,
    exceptionExemptionAndExit: String,
    lobResponse: String,
    wfcrcResponse: String
});