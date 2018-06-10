var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var FinancialInstitutionTracking = new Schema({
    crmsOverride: Boolean,
    fiIdentified: Boolean
}); 