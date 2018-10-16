let mongoose = require("mongoose");
let Schema = mongoose.Schema;

let HighRiskCustomerFactors = new Schema({
    countryRisk: String,
    highRiskCustomerFactors: String,
    industryRisk: String,
    ownershipAndOperationalRisk: String,
    bsaRiskRatingAndRiskCode: String
}); 