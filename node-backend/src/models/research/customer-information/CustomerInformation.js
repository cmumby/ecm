var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var CustomerInformation = new Schema({
    reportDate: Date,
    fullLegalNameOfCustomer: String,
    fullLegalAddressOfCustomer: String,
    relationshipName: String,
    reviewPeriodFrom: Date,
    reviewPeriodTo: Date,
    customerType: String
}); 