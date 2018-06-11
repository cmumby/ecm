var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var RejectedFromCornerstoneLoad = new Schema({
    products: [String],
    productsAndServicesOverview: String,
    avaAlerts: String,
    highRiskProductUsageAnalysis: String,
    transactionRisk: String
}); 