var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var SummaryOfCustomerRelationship = new Schema({
    customerBusinessModel: String,
    wcisRelationship: String,
    customerRelationship: String
}); 