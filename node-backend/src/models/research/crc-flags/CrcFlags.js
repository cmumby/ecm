let mongoose = require("mongoose");
let Schema = mongoose.Schema;

let CrcFlags = new Schema({
    bearerShareIssuingEntity: Boolean,
    exemptionRequested: Boolean,
    referredToExit: Boolean,
    exceptionRquested: Boolean,
    customerTypeQuestion: Boolean,
    materialNegativeNews: Boolean,
    restrictedCustomer: Boolean
}); 