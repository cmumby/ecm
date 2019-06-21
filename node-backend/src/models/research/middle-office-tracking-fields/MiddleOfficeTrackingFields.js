const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const MiddleOfficeTrackingFields = new Schema({
    itemNumber: Number,
    itemComments: String,
    lobDispute: Boolean,
    dateLogged: Date,
    dateResolved: Date
}); 