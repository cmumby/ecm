const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const SummaryOfCustomerRelationship = new Schema({
    customerBusinessModel: String,
    wcisRelationship: String,
    customerRelationship: String
}); 