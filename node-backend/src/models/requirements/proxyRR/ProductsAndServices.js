const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Attachment = require('../../Attachment');

const ProductsAndServices = new Schema({
    currentProducts: Array,
    userProducts: Array,
    attachments: [Attachment],
    raCorrectionRequired: Boolean,
    comments: String,
    complete: Boolean
});