var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var QcInformation = require('./QcInformation');
var QcReview = require('./QcReview');

var QcChecklist = new Schema({
    qcInformation: QcInformation,
    qcReview: QcReview,
    sectionComplete: Boolean
});