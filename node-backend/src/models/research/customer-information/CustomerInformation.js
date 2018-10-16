let mongoose = require("mongoose");
let Schema = mongoose.Schema;

let CustomerInformation = new Schema({
    reportDate: Date,
    fullLegalNameOfCustomer: String,
    fullLegalAddressOfCustomer: String,
    relationshipName: String,
    reviewPeriodFrom: Date,
    reviewPeriodTo: Date,
    customerType: String
}); 