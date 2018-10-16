let mongoose = require("mongoose");
let Schema = mongoose.Schema;
let QcInformation = require('./QcInformation');
let QcReview = require('./QcReview');

let QcChecklist = new Schema({
    qcInformation: QcInformation,
    qcReview: QcReview,
    sectionComplete: Boolean
});