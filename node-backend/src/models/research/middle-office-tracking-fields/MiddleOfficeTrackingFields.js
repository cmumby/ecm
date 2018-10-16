let mongoose = require("mongoose");
let Schema = mongoose.Schema;

let MiddleOfficeTrackingFields = new Schema({
    itemNumber: Number,
    itemComments: String,
    lobDispute: Boolean,
    dateLogged: Date,
    dateResolved: Date
}); 