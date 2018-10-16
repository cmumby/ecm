let mongoose = require("mongoose");
let Schema = mongoose.Schema;
let RequiredDocuments = require('./RequiredDocuments');

let Documentation = new Schema({
    requiredDocuments: RequiredDocuments,
    sectionComplete: Boolean
});