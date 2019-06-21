const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const QcInformation = require('./QcInformation');
const QcReview = require('./QcReview');

const QcChecklist = new Schema({
    qcInformation: QcInformation,
    qcReview: QcReview,
    sectionComplete: Boolean
});