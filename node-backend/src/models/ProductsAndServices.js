var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var Attachment = require('./Attachment');

var ProductsAndServices = new Schema({
    currentProducts: Array,
    userProducts: Array,
    attachments: [Attachment],
    raCorrectionRequired: Boolean,
    comments: String,
    complete: Boolean
});