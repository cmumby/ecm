var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var DueDiligenceUpdate = new Schema({
    unusualActivitiy: String,
    totalNumberofUnusualActivity: String,
    pep: String,
    adverseNews: String,
    publicInfo: String,
    highRiskProductUsage: String,
    amlRiskSummary: String
}); 