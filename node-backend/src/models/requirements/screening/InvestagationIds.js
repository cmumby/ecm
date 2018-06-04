var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var Attachment = require('../../Attachment');

var InvestagationIds = new Schema({
    investagationId: String,
});