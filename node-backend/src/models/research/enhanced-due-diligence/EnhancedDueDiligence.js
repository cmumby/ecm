var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var EnhancedDueDiligence = new Schema({
    highRiskFactors: String,
    sourceOfWealth: String,
    adversNewsSearch: String
}); 