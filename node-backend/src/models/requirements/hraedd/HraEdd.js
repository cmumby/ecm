const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Edd = require('./Edd');

const HraEdd = new Schema({
    edd: Edd,
    sectionComplete: Boolean
});