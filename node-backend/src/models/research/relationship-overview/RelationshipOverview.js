let mongoose = require("mongoose");
let Schema = mongoose.Schema;

let RejectedFromCornerstoneLoad = new Schema({
    products: [String],
    productsAndServicesOverview: String,
    avaAlerts: String,
    highRiskProductUsageAnalysis: String,
    transactionRisk: String
}); 