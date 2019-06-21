const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Sarf = require('./Sarf');

const TransportationSarf = new Schema({
    sarf: Sarf,
    sectionComplete: Boolean
});