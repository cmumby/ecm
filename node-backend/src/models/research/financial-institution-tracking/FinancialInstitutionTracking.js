let mongoose = require("mongoose");
let Schema = mongoose.Schema;

let FinancialInstitutionTracking = new Schema({
    crmsOverride: Boolean,
    fiIdentified: Boolean
}); 