const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Attachment = require('../../Attachment');

const RelationshipManager = new Schema({
    rm: String,
    om: String,
    attachments: [Attachment],
    raCorrectionRequired: Boolean,
    comments: String,
    complete: Boolean
});