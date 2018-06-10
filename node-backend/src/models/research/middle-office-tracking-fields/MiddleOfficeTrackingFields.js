var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var MiddleOfficeTrackingFields = new Schema({
    itemNumber: Number,
    itemComments: String,
    lobDispute: Boolean,
    dateLogged: Date,
    dateResolved: Date
}); 