let mongoose = require("mongoose");
let Schema = mongoose.Schema;
let Attachment = require('../../Attachment');

let InvestagationIds = new Schema({
    investagationId: String,
});