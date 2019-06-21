const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const RequiredDocuments = require('./RequiredDocuments');

const Documentation = new Schema({
    requiredDocuments: RequiredDocuments,
    sectionComplete: Boolean
});