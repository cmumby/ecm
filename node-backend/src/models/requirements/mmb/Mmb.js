var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var ManagedReportingAttributes = require('./ManagedReportingAttributes');

var Mmb = new Schema({
    managedReportingAttributes: ManagedReportingAttributes,
    sectionComplete: Boolean
});