const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const EnhancedDueDiligence = new Schema({
    highRiskFactors: String,
    sourceOfWealth: String,
    adversNewsSearch: String
}); 