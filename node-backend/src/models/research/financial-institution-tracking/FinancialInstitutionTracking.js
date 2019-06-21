const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const FinancialInstitutionTracking = new Schema({
    crmsOverride: Boolean,
    fiIdentified: Boolean
}); 