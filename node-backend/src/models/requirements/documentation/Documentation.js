var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var RequiredDocuments = require('./RequiredDocuments');

var Documentation = new Schema({
    requiredDocuments: RequiredDocuments,
    sectionComplete: Boolean
});