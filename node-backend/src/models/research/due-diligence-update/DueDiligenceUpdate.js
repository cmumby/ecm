let mongoose = require("mongoose");
let Schema = mongoose.Schema;

let DueDiligenceUpdate = new Schema({
    unusualActivitiy: String,
    totalNumberofUnusualActivity: String,
    pep: String,
    adverseNews: String,
    publicInfo: String,
    highRiskProductUsage: String,
    amlRiskSummary: String
}); 