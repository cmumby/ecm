const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CrcFlags = new Schema({
    bearerShareIssuingEntity: Boolean,
    exemptionRequested: Boolean,
    referredToExit: Boolean,
    exceptionRquested: Boolean,
    customerTypeQuestion: Boolean,
    materialNegativeNews: Boolean,
    restrictedCustomer: Boolean
}); 