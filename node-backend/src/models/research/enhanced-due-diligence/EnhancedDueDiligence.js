let mongoose = require("mongoose");
let Schema = mongoose.Schema;

let EnhancedDueDiligence = new Schema({
    highRiskFactors: String,
    sourceOfWealth: String,
    adversNewsSearch: String
}); 