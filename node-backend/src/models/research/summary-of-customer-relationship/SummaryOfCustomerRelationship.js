let mongoose = require("mongoose");
let Schema = mongoose.Schema;

let SummaryOfCustomerRelationship = new Schema({
    customerBusinessModel: String,
    wcisRelationship: String,
    customerRelationship: String
}); 