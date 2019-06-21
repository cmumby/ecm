const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const DueDiligenceUpdate = new Schema({
    unusualActivitiy: String,
    totalNumberofUnusualActivity: String,
    pep: String,
    adverseNews: String,
    publicInfo: String,
    highRiskProductUsage: String,
    amlRiskSummary: String
}); 