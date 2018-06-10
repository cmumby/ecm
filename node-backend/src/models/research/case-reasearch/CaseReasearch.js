var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var CaseReasearch = new Schema({
    issueDescription: String,
    exceptionExemptionAndExit: String,
    lobResponse: String,
    wfcrcResponse: String
});