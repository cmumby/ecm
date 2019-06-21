const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CaseReasearch = new Schema({
    issueDescription: String,
    exceptionExemptionAndExit: String,
    lobResponse: String,
    wfcrcResponse: String
});