const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CustomerInformation = new Schema({
    reportDate: Date,
    fullLegalNameOfCustomer: String,
    fullLegalAddressOfCustomer: String,
    relationshipName: String,
    reviewPeriodFrom: Date,
    reviewPeriodTo: Date,
    customerType: String
}); 