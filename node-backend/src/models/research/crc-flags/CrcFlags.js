var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var CrcFlags = new Schema({
    bearerShareIssuingEntity: Boolean,
    exemptionRequested: Boolean,
    referredToExit: Boolean,
    exceptionRquested: Boolean,
    customerTypeQuestion: Boolean,
    materialNegativeNews: Boolean,
    restrictedCustomer: Boolean
}); 