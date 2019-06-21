const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ManagedReportingAttributes = require('./ManagedReportingAttributes');

const Mmb = new Schema({
    managedReportingAttributes: ManagedReportingAttributes,
    sectionComplete: Boolean
});