const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Attachment = require('../../Attachment');

const InvestagationIds = new Schema({
    investagationId: String,
});