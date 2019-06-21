const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const HighRiskCustomerFactors = new Schema({
    countryRisk: String,
    highRiskCustomerFactors: String,
    industryRisk: String,
    ownershipAndOperationalRisk: String,
    bsaRiskRatingAndRiskCode: String
}); 