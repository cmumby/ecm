const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const RejectedFromCornerstoneLoad = new Schema({
    products: [String],
    productsAndServicesOverview: String,
    avaAlerts: String,
    highRiskProductUsageAnalysis: String,
    transactionRisk: String
}); 