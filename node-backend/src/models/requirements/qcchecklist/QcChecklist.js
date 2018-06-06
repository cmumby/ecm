var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var QcInformation = require('./QcInformation');

var QcChecklist = new Schema({
    qcInformation: QcInformation,
    sectionComplete: Boolean,
});