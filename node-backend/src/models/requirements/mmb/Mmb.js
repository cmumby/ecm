let mongoose = require("mongoose");
let Schema = mongoose.Schema;
let ManagedReportingAttributes = require('./ManagedReportingAttributes');

let Mmb = new Schema({
    managedReportingAttributes: ManagedReportingAttributes,
    sectionComplete: Boolean
});