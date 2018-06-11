var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var HighRiskCustomerFactors = new Schema({
    countryRisk: String,
    highRiskCustomerFactors: String,
    industryRisk: String,
    ownershipAndOperationalRisk: String,
    bsaRiskRatingAndRiskCode: String
}); 